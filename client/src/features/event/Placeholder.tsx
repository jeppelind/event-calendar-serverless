import { Placeholder } from "react-bootstrap";

const PlaceholderEvent = () => (
    <>
        <Placeholder as='h3' animation="wave">
            <Placeholder xs={6} />
        </Placeholder>
        <Placeholder as='p' animation="wave">
            <Placeholder xs={7} />
            <Placeholder xs={4} />
            <Placeholder xs={4} />
            <Placeholder xs={8} />
        </Placeholder>
    </>
);

export default PlaceholderEvent
