import React from 'react';
import {
    Location,
    NavigateFunction,
    Params,
    useLocation,
    useNavigate,
    useParams,
} from 'react-router-dom';

export type RouterProps = {
    location: Location;
    navigate: NavigateFunction;
    params: Readonly<Params<string>>;
}

export function withRouter<P extends RouterProps>(Component: React.ComponentType<P>): React.ComponentType<P> {
    function ComponentWithRouterProp(props: Omit<P, keyof RouterProps>) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component
                {...props as P}
                location={location}
                navigate={navigate}
                params={params}
            />
        );
    }

    return ComponentWithRouterProp;
}
