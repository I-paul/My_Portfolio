import { gsap } from "gsap"
import { SplitText } from "gsap/SplitText"
import { useGSAP } from "@gsap/react"
import { useRef } from "react"

gsap.registerPlugin(SplitText);

export default function TextFlow({ children }) {
    const textRef = useRef(null);
    
    useGSAP(() => {
        if (!textRef.current) return;
        
        let split = SplitText.create(textRef.current, { type: "chars" });
        
        gsap.set(split.chars, { opacity: 1 });
        gsap.from(split.chars, {
            opacity: 0,
            y: 20,
            duration: 1,
            stagger: 0.05,
            onComplete: () => split.revert()
        });
        
        return () => split.revert();
    }, [children]);
    
    return (
        <span ref={textRef}>
            {children}
        </span>
    )
}