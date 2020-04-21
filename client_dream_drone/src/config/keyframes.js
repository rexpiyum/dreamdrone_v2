import {keyframes} from "styled-components";

export const animationKeyFrames = {
  slideFromBottom : keyframes`
    from {
        transform: translateY(20px);
    }
    to {
        transform: translateY(0);
    }
  `,

  heartBeat : keyframes`
    10% {transform: scale(1.5)}
    20% {transform: scale(1)}
    
  `,

  fadeIn : keyframes`
    from {
        opacity:0
    }
    to {
      opacity:1
    }
  `,
  };