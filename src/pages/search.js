import React from "react";

const Events = () => {
    // Define the array with elements
    const tableData = [
        ["", "PMID", "Paper Title", "Journal", "Year"],
        ["1", "32648899", "Pathophysiology, Transmission, Diagnosis, and Treatment of Coronavirus Disease 2019 (COVID-19): A Review", "Pharmaco", "2021"],
        ["2", "32648788", "Virology, pathogenesis, diagnosis and i-line treatment of COVID-19.", "JAMA", "2020"],
        ["3", "32645022", "COVID-19: Progress in diagnostics, therapy and vaccination", "Theranostics", "2020"],
        ["4", "32648473", "Pathophysiology, Transmission, Diagnosis, and Treatment of Coronavirus Disease 2019 (COVID-19): A Review", "Transl Med", "2020"],
    ];

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                padding: "20px"
            }}
        >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ position: "relative", display: "inline-block", borderRadius: "4px" }}>
                    <input
                        type="text"
                        style={{
                            padding: "10px",
                            paddingRight: "70px", // Adjusted to accommodate the button
                            width: "500px", // Adjusted width as needed
                            border: "1px solid #ccc", // Example border style
                            borderRadius: "4px 0 0 4px" // Rounded edges on left side
                        }}
                        placeholder="Enter query here"
                    />
                    <button
                        className='search-button'
                        style={{
                            position: "absolute",
                            right: "0px",
                            height: "100%",
                            padding: "10px 20px",
                            border: "none",
                            backgroundColor: "#69a765",
                            color: "#fff",
                            borderRadius: "0 4px 4px 0", // Rounded edges on right side
                            cursor: "pointer",
                            display: "inline-block",


                        }}
                    >
                        Go
                    </button>
                </div>
            </div>
            <table style={{ marginTop: "20px", borderCollapse: "collapse", width: "80%" }}>
                <tbody>
                    {tableData.map((row, rowIndex) => (
                        <tr key={rowIndex} style={{
                            backgroundColor: rowIndex === 0 ? "#333" : rowIndex % 2 === 0 ? "#f2f2f2" : "#fff",
                            color: rowIndex === 0 ? "#fff" : "#000",
                            transition: "transform 0.3s",
                        }} className="table-row"
                        >
                            {row.map((col, colIndex) => (
                                <td
                                    key={colIndex}
                                    style={{
                                        border: "1px solid black",
                                        padding: "10px",
                                        textAlign: "center"
                                    }}
                                >
                                    {col}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <style jsx>{`
                .table-row:hover {
                    transform: scale(1.05);
                }
            `}</style>
        </div>
    );
};

export default Events;
