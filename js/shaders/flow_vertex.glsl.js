let fv = document.getElementById('FlowVertex');

fv.text = `precision lowp float;
	
attribute vec2 position;

uniform float time;
uniform float ratio;
uniform float step;
uniform float opacity;

varying float alpha;

float iqhash( float n ) {
    return fract( sin( n ) * 43758.5453 );
}

float noise( vec3 x ) {
    vec3 f = fract( x );
    f = f * f * ( 3.0 - 2.0 * f );
    float n = dot( floor( x ), vec3( 1.0, 57.0, 113.0 ) );
    return mix(
                mix( mix( iqhash( n +   0.0 ), iqhash( n +   1.0 ), f.x ),
                     mix( iqhash( n +  57.0 ), iqhash( n +  58.0 ), f.x ),
                     f.y ),
                mix(
                     mix( iqhash( n + 113.0 ), iqhash( n + 114.0 ), f.x ),
                     mix( iqhash( n + 170.0 ), iqhash( n + 171.0 ), f.x ),
                     f.y ),
                f.z );
}

vec3 getVertex( float x, float y ) {
    vec3 vertex = vec3( x, cos( y * 4.0 ) * cos( y + time / 5.0 + x ) / 8.0, y );

    float c = noise( vertex * vec3( 7.0 / 4.0, 7.0, 7.0 ) ) / 15.0;
    vertex.y += c + cos( x * 2.0 - time ) * ratio / 2.0 - 0.3;
    vertex.z += c;

    return vertex;
}

void main() {
    gl_Position = vec4( getVertex( position.x, position.y ), 1.0 );

    vec3 dfdx = getVertex( position.x + step, position.y ) - gl_Position.xyz;
    vec3 dfdy = getVertex( position.x, position.y + step ) - gl_Position.xyz;
    alpha = 1.0 - abs( normalize( cross( dfdx, dfdy ) ).z );
    alpha = ( 1.0 - cos( alpha * alpha ) ) * opacity;
}`