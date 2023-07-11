let bgf = document.getElementById('BackgroundFragment');

bgf.text = `precision lowp float;
	
uniform vec3 color;
uniform vec2 resolution;
uniform sampler2D bayerTexture;

varying highp vec2 pos;
varying float gradient;

const float colorDepth = 255.0;

vec3 dither( vec2 position, vec3 color ) {
    float threshold = texture2D( bayerTexture, position / 8.0 ).a;
    vec3 diff = 1.0 - mod( color * colorDepth, 1.0 );
    return color + diff * vec3(
            float( diff.r < threshold ),
            float( diff.g < threshold ),
            float( diff.b < threshold )
        ) / colorDepth;
}

void main() {
    gl_FragColor = vec4( dither( pos, gradient * color ), 1.0 );
}`