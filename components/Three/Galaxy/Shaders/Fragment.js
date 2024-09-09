// import * as glsl from 'glslify'

export const Fragment = `
    varying vec3 vColor;

    void main(){
        
        /* Circular form with solid border */ 
        // float strength = distance(gl_PointCoord, vec2(0.5, 0.5)); 
        // strength = step(0.5, strength);
        // strength = 1.0 - strength;


        /* Circular form with diffuse border */
        float strength = distance(gl_PointCoord, vec2(0.5, 0.5)); 
        strength = 1.0 - strength;
        strength *= 2.0;

        /* Light pattern */
        // float strength = distance(gl_PointCoord, vec2(0.5, 0.5)); 
        // strength = 1.0 - strength;
        // strength = pow(strength, 10.0);

        vec4 Color = vec4(vColor, strength);
        gl_FragColor = Color;
    }
`
