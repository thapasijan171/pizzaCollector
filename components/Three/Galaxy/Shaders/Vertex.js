// import * as glsl from 'glslify'

export const Vertex = `
  attribute float aScale;  
  attribute vec3 aRandomness;

  uniform float uStartSize; 
  uniform float uTime;   
  uniform float uOriginZ;
  uniform float uOriginX;
  uniform float uOriginY;

  varying vec3 vColor; 

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position,1.0);
   
    /* Sping */
    float angle = atan(modelPosition.x, modelPosition.z);
    float distanceToCenter = length(modelPosition.xz) / 2.0;
    float offsetAngle = (1.0 / distanceToCenter) * uTime * 0.2;
    angle += offsetAngle;

    modelPosition.x = cos(angle) * distanceToCenter;
    modelPosition.z = sin(angle) * distanceToCenter;

    /* Randomness */
    modelPosition.x += aRandomness.x; 
    modelPosition.y += aRandomness.y;
    modelPosition.z += aRandomness.z; 

        /* set the origin */
    modelPosition.x += uOriginX;
    modelPosition.z += uOriginZ;
    modelPosition.y += uOriginY;

    
    vec4 viewPosition = viewMatrix * modelPosition; 
    vec4 projectedPosition = projectionMatrix * viewPosition;
    gl_Position = projectedPosition;


    gl_PointSize = uStartSize * aScale;
    gl_PointSize *= (1.0 / - viewPosition.z  );

    vColor = color; 

  }
    `
