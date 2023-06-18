import { Box } from "@mui/material"

import "../App.css"

const Brand = (props) => {
    return (
        <Box className="brand">
        {props.brand}
        </Box>
    )
}

export default Brand