/* WebGPU animated background */
(async () => {
  if (!('gpu' in navigator)) {
    console.warn('WebGPU not supported');
    return;
  }
  const canvas = document.getElementById('webgpu');
  if (!canvas) return;

  const adapter = await navigator.gpu.requestAdapter();
  if (!adapter) return;
  const device = await adapter.requestDevice();
  const context = canvas.getContext('webgpu');
  const format = navigator.gpu.getPreferredCanvasFormat();
  context.configure({ device, format, alphaMode: 'premultiplied' });

  const vertices = new Float32Array([
    0, 0.5, 1, 0, 0, 1,
    -0.5, -0.5, 0, 1, 0, 1,
    0.5, -0.5, 0, 0, 1, 1,
  ]);

  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices);

  const shader = `
    struct Uniforms {
      matrix : mat4x4<f32>
    };
    @group(0) @binding(0) var<uniform> u : Uniforms;

    struct VertexInput {
      @location(0) pos : vec2<f32>;
      @location(1) color : vec4<f32>;
    };

    struct VSOut {
      @builtin(position) pos : vec4<f32>;
      @location(0) color : vec4<f32>;
    };

    @vertex fn vs(input : VertexInput) -> VSOut {
      var out : VSOut;
      out.pos = u.matrix * vec4<f32>(input.pos, 0.0, 1.0);
      out.color = input.color;
      return out;
    }

    @fragment fn fs(input : VSOut) -> @location(0) vec4<f32> {
      return input.color;
    }
  `;

  const module = device.createShaderModule({ code: shader });
  const pipeline = device.createRenderPipeline({
    layout: 'auto',
    vertex: {
      module,
      entryPoint: 'vs',
      buffers: [{
        arrayStride: 24,
        attributes: [
          { shaderLocation: 0, offset: 0, format: 'float32x2' },
          { shaderLocation: 1, offset: 8, format: 'float32x4' },
        ],
      }],
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-list' },
  });

  const uniformBuffer = device.createBuffer({
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [{ binding: 0, resource: { buffer: uniformBuffer } }],
  });

  function resize() {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
  }
  resize();
  window.addEventListener('resize', resize);

  function frame(time) {
    const t = time * 0.001;
    const c = Math.cos(t), s = Math.sin(t);
    const mat = new Float32Array([
      c,  s,  0, 0,
     -s,  c,  0, 0,
      0,  0,  1, 0,
      0,  0,  0, 1,
    ]);
    device.queue.writeBuffer(uniformBuffer, 0, mat);

    const encoder = device.createCommandEncoder();
    const pass = encoder.beginRenderPass({
      colorAttachments: [{
        view: context.getCurrentTexture().createView(),
        loadOp: 'clear',
        clearValue: { r: 0, g: 0, b: 0, a: 0 },
        storeOp: 'store',
      }],
    });
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.setVertexBuffer(0, vertexBuffer);
    pass.draw(3);
    pass.end();

    device.queue.submit([encoder.finish()]);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
})();
