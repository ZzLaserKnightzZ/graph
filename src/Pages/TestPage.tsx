import React, { useEffect, useRef, useState } from "react"
import { ColorStop, GradientBuilder, GradientPosition, Canvas, PathData, Rect, Position, Arc, Line, QuadraticCurveTo, Point, BezierCurveTo, Text, PolyLine, Img } from "../canvasLib/canvas";
import useMouseDown from "../hooks/useMouseDown";
import useMousePosition from "../hooks/useMousePosition";
import TestPage2 from "./TestPage2";
import { TestPage3 } from "./TestPage3";
import { TestPage4 } from "./TestPage4";

const can = new Canvas();

//----------------test-------------------------
/*
let p = new PathData();
let rect = new Rect(new Position(0.2, 0.2, 0.1, 0.1));
p.normalStyle.fillStyle = "pink";
p.hoverStyle.fillStyle = "yelloe";
p.Shape = rect;
p.runUpdateSelf = (ppp: PathData) => {
    let sss = ppp.Shape as Rect;

    if (sss.y >= 0.8) {
        sss.y = 0.01;
    } else {
        sss.y += 0.01;
    }
    //ppp.hoverStyle.fillStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},1)`;
}
can.addBeforePath(p);

let p1 = new PathData();
let arc = new Arc(0, Math.PI * 2, new Position(0.2, 0.2, 0.1, 0.1));
p1.normalStyle.fillStyle = "pink";
p1.normalStyle.strokeStyle = "black";
p1.hoverStyle.fillStyle = "violet";
p1.Shape = arc;
p1.runUpdateSelf = (ppp: PathData) => {
    let sss = ppp.Shape as Arc;

    if (sss.x >= 0.8) {
        sss.x = 0.01;
    } else {
        sss.x += 0.01;
    }

    if(sss.w > 0.5){
        sss.w = 0.1;
    }else{
        sss.w += 0.01;
    }
    
}
can.addAfterPath(p1);

let l = new PathData();
let line = new Line(0.1, 0.1, 0.5, 0.5);
l.normalStyle.fillStyle = "pink";
l.hoverStyle.fillStyle = "gray";
l.Shape = line;
can.addAfterPath(l);


let q = new PathData();
let qu = new QuadraticCurveTo(new Point(0.1, 0.1), new Point(0.7, 0.4), new Point(0.6, 0.6));
q.normalStyle.fillStyle = "red";
q.normalStyle.strokeStyle = "transparent";
q.hoverStyle.fillStyle = "pink";
q.Shape = qu;
can.addAfterPath(q);


let b = new PathData();
let bb = new BezierCurveTo(new Point(0.1, 0.1), new Point(0.7, 0.4), new Point(0.6, 0.6), new Point(0.6, 0.6));
b.normalStyle.fillStyle = "lime";
b.hoverStyle.fillStyle = "red";
b.Shape = bb;
can.addAfterPath(b);


let t = new PathData();
let tt = new Text("hello", "center", 0.1, 0.9, 0.05, 0.2);
t.normalStyle.fillStyle = "lime";
t.hoverStyle.fillStyle = "green";
t.Shape = tt;
can.addAfterPath(t);


let pl = new PathData();
let pc: Point[] = [];
for (let i = 0; i < 20; i++) {
    pc.push(new Point(Math.random() * 1, Math.random() * 1));
}
console.log(pc);
let po = new PolyLine(pc, new Point(0.9, 0.9), new Point(0.1, 0.9));
pl.normalStyle.strokeStyle = "gold";
pl.normalStyle.fillStyle = "transparent";
pl.hoverStyle.fillStyle = "red";
pl.Shape = po;
can.addBeforePath(pl);


let im = new PathData();
let img = new Img("https://g65zdg.by.files.1drv.com/y4mKJN05SnYV_s84D18pnVCni8m_ORg2tFsRd01Z8Pjq-TafU01Y9QJURrkepjxLjDI36Uqi3eg4ASEoA3ngLHMARt79YyMfObSx-BrOuOfswM9EZRgXkts6iwce_DTGIZ3FjZuXFeURIHfHLsBdona3eevO8SJ1CXcz6MuHWtuA6KmiFy_okREMXqlsgZTxsVn2ZAPxI6Njvjo0lqlzUVeyg?width=1150&height=2048&cropmode=none", 0.5, 0.5, 0.3, 0.3);
im.Shape = img;
can.addBeforePath(im);
*/
//----------------test-------------------------

const obj = {
    labelVer:[
        "0",
        "10",
        "20",
        "30",
        "40",
        "50",
        "60",
        "70",
        "80",
        "90",
        "100",
    ],
    labelHor:[], //auto = value.length / 14 
    value:[0.2,.01,0.6]
}

const drawTextVer = [
    "0",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
];

const drawTextHor: string[] = [];

const dataLength = 50;
//seed text hor text
for (let i = 1; i <= dataLength; i++) {
    drawTextHor.push(i + "");
}

const graphValue:{x:number;y:number}[] = [];

const cnt = 0.8 / dataLength; //width80%/data.length
//seed  value data
for (let i = 0; i < 0.8; i += cnt) {
  graphValue.push({ x: i + 0.1, y: Math.random() * 0.8 + 0.1 }); //max height 80%= 0.8,standart w&h = +0.1
}

graphValue.map((x) => {
  return { ...x, y: 1 - x.y }; //reverse y = 1 - value
});

const perLine = 0.8 / (drawTextVer.length - 1); //graph height 80% / 10-100 per = length - 1
//draw vertical line
for (let y = 0.9; y >= 0.1; y -= perLine) {
    //line = 0.8/10
    const dotline = new Line(0.1, y, 0.9, y, 1);
    const p = new PathData();
    p.normalStyle.strokeStyle = "lime";
    p.Shape = dotline;
    can.addAfterPath(p);
}

//draw vertical text
let lineCnt = 0;
for (let y = 0.9; y >= 0.1; y -= perLine) {
    //line = 0.8/sum(arr.length)
    const textline = new PathData();
    const t = new Text(drawTextVer[lineCnt], "left", 0.03, y, 0.03, 0.05);
    textline.Shape = t;
    textline.normalStyle.fillStyle = "gold";
    can.addAfterPath(textline);
    lineCnt++;
}

//draw hor text
lineCnt = 0;
for (let x = 0.1; x <= 0.9; x += 0.8 / (drawTextHor.length - 1 / 2)) {
    //line = 0.8/sum(arr.length)
    const textline = new PathData();
    const t = new Text(drawTextHor[lineCnt], "center", x, 0.93, 0.01, 0.02);
    textline.Shape = t;
    textline.normalStyle.fillStyle = "gold";
    can.addAfterPath(textline);
    lineCnt++;
}

const points:Point[]= [];
graphValue.forEach(v => {
    points.push(new Point(v.x,v.y)); 
});
//draw data
const polyLine= new PolyLine(points,new Point(0.1,0.9), new Point(0.9,0.9));
const polyPath= new PathData();
polyPath.Shape = polyLine;
polyPath.normalStyle.strokeStyle = "blue";
polyPath.normalStyle.fillStyle = "rgba(0,0,0,0.5)";
polyPath.hoverStyle.fillStyle = "#eb25eb7f";
polyPath.hoverStyle.strokeStyle = "rgba(200,200,100,0.7)";
can.addAfterPath(polyPath);

//ver line
const pathLine1 = new PathData();
const line1 = new Line(0.1, 0.9, 0.1, 0.1, 5);
pathLine1.normalStyle.strokeStyle = "black";
pathLine1.Shape = line1;
can.addAfterPath(pathLine1);

//hor line
const pathLine2 = new PathData();
const line2 = new Line(0.1, 0.9, 0.9, 0.9, 5);
pathLine2.normalStyle.strokeStyle = "black";
pathLine2.Shape = line2;
can.addAfterPath(pathLine2);

const TestPage: React.FC<{}> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [stopRender, setStopRender] = useState(false);
    const mousePosition = useMousePosition();
    const mouseDown = useMouseDown();
    const [mousePositionInCanvas, setMousePositionInCanvas] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const adjustMousePositionCanvas = () => {

        if (canvasRef?.current) {
            const _offsetTop = canvasRef?.current?.offsetTop;
            const _offsetLeft = canvasRef?.current?.offsetLeft;
            setMousePositionInCanvas((prev) => {
                return { x: mousePosition.x - _offsetLeft, y: mousePosition.y - _offsetTop };
            });
        }

    };

    useEffect(adjustMousePositionCanvas, [mousePosition]);

    //init
    useEffect(() => {
        if (canvasRef.current) {
            canvasRef.current.width = window.innerWidth;
            canvasRef.current.height = window.innerHeight;
            can.width = window.innerWidth;
            can.height = window.innerHeight;
            const context = canvasRef.current?.getContext("2d");
            if (context) {
                can.ctx = context;
            }
        }
    }, []);

    useEffect(() => {
        let animeId: number;

        const render = () => {
            can.mousePosition = mousePositionInCanvas;
            can.mouseDown = mouseDown;
            can.draw();
            if (!stopRender) animeId = window.requestAnimationFrame(render);
        }

        render();
        return () => window.cancelAnimationFrame(animeId);
    }, [mousePositionInCanvas]);

    return <>
        right click and save to image
        <canvas ref={canvasRef} style={{ backgroundColor: "lime" }}>hello word</canvas>
        <TestPage2/>
        <TestPage3/>
        <TestPage4/>
    </>
}

export default TestPage