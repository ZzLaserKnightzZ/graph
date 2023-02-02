import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { Canvas, Line, PathData, Position, Rect, Text } from '../canvasLib/canvas';
import useMouseDown from '../hooks/useMouseDown';
import useMousePosition from '../hooks/useMousePosition';

const can = new Canvas();
let valueData: string = "";
const obj = {
  label:[
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
dataset:[
  { year: "2011", value: 0.25 },
  { year: "2012", value: 1 },
  { year: "2013", value: 0.9 },
  { year: "2014", value: 0.8 },
  { year: "2015", value: 0.8 },
  { year: "2016", value: 0.14 },
  { year: "2017", value: 0.2 },
  { year: "2018", value: 0.5 },
  { year: "2019", value: 0.15 },
  { year: "2020", value: 0.55 },
  { year: "2021", value: 0.66 },
  { year: "2022", value: 0.02 },
  { year: "2023", value: 0.66 },
  { year: "2024", value: 0.78 },
]
}

let objData = [...obj.dataset];

const copyData = [...objData]; //deep copy
const levelText = [...obj.label];

objData = objData.map((data) => {
  return { ...data, value: data.value * 0.8 }; //map value to % = value*height
});

let verTextIndex = 0;
const perLine = 0.8 / (levelText.length - 1); //graph height 80% / 10-100 per = length - 1
//draw vertical line
for (let y = 0.9; y >= 0.1; y -= perLine) {
  //line = 0.8/10
  const dotline = new Line(0.1, y, 0.9, y, 1);
  const p = new PathData();
  p.normalStyle.strokeStyle = "lime";
  p.Shape = dotline;
  can.addAfterPath(p);
  //text ver
  const textVer = new Text(levelText[verTextIndex], "center", 0.05, y, 0.03, 0.07);
  const pp = new PathData();
  pp.Shape = textVer;
  pp.normalStyle.fillStyle = "green";
  can.addAfterPath(pp);
  verTextIndex++;
}

const spaceGab = 0.8 / objData.length; //width/data.length
let x = 0.1;
for (let objIndex = 0; objIndex < objData.length; objIndex++) {
  const width = spaceGab - 0.01; //width - 1%
  const height = objData[objIndex].value; 
  const rect1 = new Rect(
    new Position(x + 0.01, //x + gap 1%
      1 - objData[objIndex].value - 0.1, //invert rect = 1 - value percent - endline
      width,
      height));


  const p1 = new PathData();
  p1.Shape = rect1;
  p1.mouseEvent = (_pbMouseHover, _pbMouseDown, _poPath) => {
    if (_pbMouseHover) {
      valueData = (copyData[objIndex].value * 100).toFixed(0);
    }
  };
  p1.hoverStyle.fillStyle = "rgba(0,100,0,0.5)";
  p1.normalStyle.fillStyle = "yellow";

  can.addAfterPath(p1);

  const text = new Text(objData[objIndex].year, "center", 0.03 + x, 0.93, 0.02);
  const p2 = new PathData();
  p2.Shape = text;
  p2.normalStyle.fillStyle = "red";
  can.addAfterPath(p2);

  x += spaceGab;
}

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

const TestPage2: React.FC = (props) => {
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
  return <>{valueData}<canvas ref={canvasRef}></canvas></>;
};

export default TestPage2;


