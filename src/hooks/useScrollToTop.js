import { useEffect } from "react";

export const useScrollToTop = (dependency) => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [dependency])
}