import React from "react";

export default function PageBreak() {
    return (
        <div
            className="pageBreak"
            style={{
                //this sets the margin for reviews and draws a line hovering under the titles
                marginBottom: "3%",
                marginTop: "3%",
                height: "1px",
                backgroundColor: "#dedede",
                border: "none",
                boxShadow: "0px 0px 10px 0px black",
            }}
        />
    );
}
