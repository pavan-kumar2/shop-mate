import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom";

export const useSearchBarVisible = () => {
    const [visibleSearchBar, setVisibleSearchBar] = useState(false);

    const location = useLocation();

    useEffect(() => {
        const searchVisiblePath = ['/', '/cart'];

        setVisibleSearchBar(searchVisiblePath.includes(location.pathname))

    }, [location.pathname])


    return visibleSearchBar;
}