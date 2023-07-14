const regl = createREGL( {
    attributes: {
        antialias: true
    },
    optionalExtensions: [ "EXT_disjoint_timer_query" ],
    profile: true
} );

const RESOLUTION = 50;
const NUM_PARTICLES = 400;
const NUM_VERTICES = RESOLUTION * RESOLUTION + ( RESOLUTION + 2 ) * ( RESOLUTION - 2 ) + 2;
const PARTICLE_SIZE = 8;

function makeFlowVertices() {
    const vertices = new Float32Array( NUM_VERTICES * 3 );
    const yPos = new Float32Array( RESOLUTION );
    for( let y = 0; y < RESOLUTION; y++ ) {
        yPos[ y ] = y / ( RESOLUTION - 1 ) * 2 - 1;
    }
    let xPos1 = -1;
    let numVertices = 0;
    for( let x = 1; x < RESOLUTION; x++ ) {
        const xPos2 = x / ( RESOLUTION - 1 ) * 2 - 1;
        vertices[ numVertices++ ] = xPos2;
        vertices[ numVertices++ ] = -1;
        for( let y = 0; y < RESOLUTION; y++ ) {
            vertices[ numVertices++ ] = xPos2;
            vertices[ numVertices++ ] = yPos[ y ];
            vertices[ numVertices++ ] = xPos1;
            vertices[ numVertices++ ] = yPos[ y ];
        }
        vertices[ numVertices++ ] = xPos1;
        vertices[ numVertices++ ] = 1;
        xPos1 = xPos2;
    }
    return vertices;
}

function makeParticleSeeds() {
    const seeds = new Float32Array( NUM_PARTICLES * 3 );
    let numSeeds = 0;
    for( let i = 0; i < NUM_PARTICLES; i++ ) {
        seeds[ numSeeds++ ] = Math.random();
        seeds[ numSeeds++ ] = Math.random();
        seeds[ numSeeds++ ] = Math.pow( Math.random(), 10 ) * PARTICLE_SIZE + 3;
    }
    return seeds;
}

const drawBackground = regl( {
    vert: BackgroundVertex.firstChild.nodeValue,
    frag: BackgroundFragment.firstChild.nodeValue,
    primitive: "triangle strip",
    count: 4,
    attributes: {
        position: [
            +1, -1,
            -1, -1,
            +1, +1,
            -1, +1
        ]
    },
    uniforms: {
        color: regl.prop( "color" ),
        resolution: ( context, props ) => [ context.viewportWidth, context.viewportHeight ],
        bayerTexture: regl.texture( {
            data: Uint8Array.of(
                  0, 128,  32, 160,   8, 136,  40, 168,
                192,  64, 224,  96, 200,  72, 232, 104,
                 48, 176,  16, 144 , 56, 184,  24, 152,
                240, 112, 208,  80, 248, 120, 216,  88,
                 12, 140,  44, 172,   4, 132,  36, 164,
                204,  76, 236, 108, 196,  68, 228, 100,
                 60, 188,  28, 156,  52, 180,  20, 148,
                252, 124, 220,  92, 244, 116, 212,  84
            ),
            format: "alpha",
            shape: [ 8, 8 ],
            wrap: [ "repeat", "repeat" ]
        } )
    },
    dither: false,
    depth: { enable: false }
} );

const drawFlow = regl( {
    vert: FlowVertex.firstChild.nodeValue,
    frag: FlowFragment.firstChild.nodeValue,
    primitive: "triangle strip",
    count: NUM_VERTICES,
    attributes: {
        position: makeFlowVertices()
    },
    uniforms: {
        time: regl.prop("time"),
        opacity: regl.prop( "opacity" ),
        ratio: regl.prop( "ratio" ),
        step: 2 / RESOLUTION
    },
    blend: {
        enable: true,
        func: { src: 1, dst: 1 }
    },
    dither: false
} );

const drawParticles = regl( {
    vert: ParticleVertex.firstChild.nodeValue,
    frag: ParticleFragment.firstChild.nodeValue,
    primitive: "points",
    count: NUM_PARTICLES,
    attributes: {
        seed: makeParticleSeeds()
    },
    uniforms: {
        time: regl.prop("time"),
        ratio: regl.prop("ratio"),
        opacity: regl.prop( "particleOpacity" )
    },
    blend: {
        enable: true,
        func: { src: 1, dst: 1 }
    },
    dither: false,
    depth: { enable: false }
} );

const drawParams = {
    time: 0,
    color: [ 0, 0, 0 ]
};

const config = new Configuration( document.body );
config.addList( "Color", [
        [ "silk"     , [ 104, 107, 108 ] ],
        [ "turquoise", [  26, 115, 115 ] ],
        [ "emerald"  , [  20, 101,  50 ] ],
        [ "sapphire" , [  37,  89, 179 ] ],
        [ "gold"     , [ 160, 120,  0 ] ],
        [ "ruby"     , [ 116,  15,  48 ] ],
        [ "amethyst" , [ 118,   6, 135 ] ],
        [ "amber"    , [ 192, 114,  40 ] ]
    ], "sapphire", ( color ) => drawParams.backgroundColor = color );
config.addRange( "Speed", 0.25, 0, 4, 0.01, ( flowSpeed ) => drawParams.flowSpeed = flowSpeed );
config.addRange( "Opacity", .75, 0, 1, 0.01, ( opacity ) => drawParams.opacity = opacity );
config.addRange( "Day", 0.5, 0, 1, 0.01, ( day ) => drawParams.brightness = ( 1 - Math.cos( day * 2 * Math.PI ) ) / 1.75 );
config.addRange( "Particle opacity", 0.75, 0, 1, 0.01, ( particleOpacity ) => drawParams.particleOpacity = particleOpacity );

let lastTime = 0;

var tick = regl.frame( ( context ) => {
    drawParams.backgroundColor.forEach( ( channel, i ) => drawParams.color[ i ] = channel * drawParams.brightness / 255 );
    drawParams.ratio = Math.max( 1.0, Math.min( context.viewportWidth / context.viewportHeight, 2.0 ) ) * 0.375;
    drawParams.time = drawParams.time + ( context.time - lastTime ) * drawParams.flowSpeed;
    lastTime = context.time;
    drawBackground( drawParams );
    drawFlow( drawParams );
    drawParticles( drawParams );
} );
//requestAnimationFrame(tick.cancel);

/* function perf() {
    const count = drawFlow.stats.count / 1000;
    console.log( `bacgkround cpu: ${Math.round(drawBackground.stats.cpuTime / count)}` );
    console.log( `bacgkround gpu: ${Math.round(drawBackground.stats.gpuTime / count)}` );
    console.log( `flow       cpu: ${Math.round(drawFlow.stats.cpuTime / count)}` );
    console.log( `flow       gpu: ${Math.round(drawFlow.stats.gpuTime / count)}` );
    console.log( `particles  cpu: ${Math.round(drawParticles.stats.cpuTime / count)}` );
    console.log( `particles  gpu: ${Math.round(drawParticles.stats.gpuTime / count)}` );
} */ 
const bg_settings_form = document.getElementById("bg_settings_form");
bg_settings_form.remove();



// HERE are the params to change
// drawParams.particleOpacity = 0;
// drawParams.brightness = 0.2;
// drawParams.backgroundColor = [ 116,  15,  48 ];

// TODO 
// make brightness increase from 0 to 0.5 smoothly
// make particles ON/OFF