import Letter from "../letter/Letter"
export default function Line({ length, gridLine, lineNum, colorLine}) {
    return (
        <div>
            {
                [...Array(length)].map((elmt, index) => {
                    return (<Letter
                        color={colorLine[index]}
                        value={gridLine[index]}
                        key={"line-" + lineNum + "-letter-" + index}
                    />
                    )
                })
            }
        </div>



    )



}