export class ColorStop {
    stop: number = 0;
    color: string = "black";
    constructor(stop: number, color: string) {
        this.stop = stop;
        this.color = color;
    }
}

export class GradientPosition {
    x0: number = 0;
    y0: number = 0;
    x1: number = 0;
    y1: number = 0;
}

export class GradientBuilder {
    private colorGradient: ColorStop[] = []; //[{sStop:'0',sColor:"red"},{sStop:'0',color:"red"}]
    private colorPosition: GradientPosition; //{ x0: 0, y0: 0, x1: 0, y1: 0 };

    constructor({ x0 = 0, y0 = 0, x1 = 0, y1 = 0 }: GradientPosition) {
        this.colorPosition = { x0, y0, x1, y1 };
    }

    public addColor(value: ColorStop): GradientBuilder {
        this.colorGradient.push(value);
        return this;
    }

    public getColorStop(): CanvasGradient {
        const ctx: CanvasRenderingContext2D = new CanvasRenderingContext2D();
        const colors = ctx.createLinearGradient(
            this.colorPosition.x0,
            this.colorPosition.y0,
            this.colorPosition.x1,
            this.colorPosition.y1
        );

        this.colorGradient.forEach((color) => {
            colors.addColorStop(color.stop, color.color);
        });

        return colors;
    }

}

export class Position {
    x: number;
    y: number;
    w: number;
    h: number;

    constructor(x = 0, y = 0, w = 0, h = 0) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

}

export class Point {
    x = 0;
    y = 0;
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
}

export interface IShape {
    path: Path2D;
    draw: (ctx: CanvasRenderingContext2D) => void;
    reSize: (p: PathData) => void;
}

export class Rect extends Position implements IShape {
    path: Path2D = new Path2D();
    private drawPiont: Position = new Position();
    constructor(position: Position) {
        super(position.x, position.y, position.w, position.h);
    }
    reSize(p: PathData) {
        this.drawPiont.x = p.getPointOfScreen(this.x, 0).x;
        this.drawPiont.y = p.getPointOfScreen(0, this.y).y;
        this.drawPiont.w = p.getPointOfScreen(this.w, 0).x;
        this.drawPiont.h = p.getPointOfScreen(0, this.h).y;
        let path = new Path2D();
        path.rect(this.drawPiont.x, this.drawPiont.y, this.drawPiont.w, this.drawPiont.h);
        this.path = path;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fill(this.path);
        ctx.stroke(this.path);
    }
}
export class Arc extends Position implements IShape {
    path: Path2D;
    private drawPiont: Position = new Position();
    startAngle = 0;
    stopeAngle = 0;
    antiClockWise = false;
    constructor(startAngle: number, stopAngle: number, position: Position) {
        super(position.x, position.y, position.w, position.y);
        this.startAngle = startAngle;
        this.stopeAngle = stopAngle;
        this.path = new Path2D();
    }

    reSize(p: PathData) {
        this.drawPiont.x = p.getPointOfScreen(this.x, 0).x;
        this.drawPiont.y = p.getPointOfScreen(0, this.y).y;
        this.drawPiont.w = p.getPointOfScreen(this.w, 0).x;
        this.drawPiont.h = p.getPointOfScreen(0, this.h).y;
        let path = new Path2D();
        path.arc(this.drawPiont.x, this.drawPiont.y, this.drawPiont.w, this.startAngle, this.stopeAngle, this.antiClockWise);
        this.path = path;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fill(this.path);
        ctx.stroke(this.path);
    }
}
export class Line extends Position implements IShape {
    path: Path2D = new Path2D();
    private drawPoint: { x0: number; y0: number; x1: number; y1: number };
    point: { x0: number; y0: number; x1: number; y1: number };
    lineWidth = 1;
    constructor(x0 = 0, y0 = 0, x1 = 0, y1 = 0, lineWidth = 1) {
        super();
        this.point = { x0, y0, x1, y1 };
        this.drawPoint = { x0: 0, y0: 0, x1: 0, y1: 0 };
        this.lineWidth = lineWidth;

    }
    reSize(p: PathData) {
        this.drawPoint.x0 = p.getPointOfScreen(this.point.x0, 0).x;
        this.drawPoint.y0 = p.getPointOfScreen(0, this.point.y0).y;
        this.drawPoint.x1 = p.getPointOfScreen(this.point.x1, 0).x;
        this.drawPoint.y1 = p.getPointOfScreen(0, this.point.y1).y;
        let path = new Path2D();
        path.moveTo(this.drawPoint.x0, this.drawPoint.y0);
        path.lineTo(this.drawPoint.x1, this.drawPoint.y1);
        this.path = path;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.drawPoint.x0, this.drawPoint.y0);
        ctx.lineTo(this.drawPoint.x1, this.drawPoint.y1);
        ctx.lineWidth = this.lineWidth;
        ctx.fill(this.path);
        ctx.stroke(this.path);
    }
}
export class QuadraticCurveTo extends Position implements IShape {
    path: Path2D = new Path2D();
    lineWidth = 1;
    point1: Point;
    point2: Point;
    point3: Point;

    private drawP1: Point;
    private drawP2: Point;
    private drawP3: Point;

    constructor(p1: Point, p2: Point, p3: Point) {
        super();
        this.point1 = p1;
        this.point2 = p2;
        this.point3 = p3;

        this.drawP1 = new Point();
        this.drawP2 = new Point();
        this.drawP3 = new Point();
    }

    reSize(p: PathData) {
        this.drawP1 = p.getPointOfScreen(this.point1.x, this.point1.y);
        this.drawP2 = p.getPointOfScreen(this.point2.x, this.point2.y);
        this.drawP3 = p.getPointOfScreen(this.point3.x, this.point3.y);
        let path = new Path2D();
        path.moveTo(this.drawP1.x, this.drawP1.y);
        path.quadraticCurveTo(this.drawP2.x, this.drawP2.y, this.drawP3.x, this.drawP3.y);
        this.path = path;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = this.lineWidth;
        ctx.fill(this.path);
        ctx.stroke(this.path);
    }
}
export class BezierCurveTo extends Position implements IShape {
    path: Path2D = new Path2D();
    lineWidth = 1;
    point1: Point;
    point2: Point;
    point3: Point;
    point4: Point;

    private drawP1: Point;
    private drawP2: Point;
    private drawP3: Point;
    private drawP4: Point;

    constructor(p1: Point, p2: Point, p3: Point, p4: Point) {
        super();
        this.point1 = p1;
        this.point2 = p2;
        this.point3 = p3;
        this.point4 = p4;

        this.drawP1 = new Point();
        this.drawP2 = new Point();
        this.drawP3 = new Point();
        this.drawP4 = new Point();
    }


    reSize(p: PathData) {
        this.drawP1 = p.getPointOfScreen(this.point1.x, this.point1.y);
        this.drawP2 = p.getPointOfScreen(this.point2.x, this.point2.y);
        this.drawP3 = p.getPointOfScreen(this.point3.x, this.point3.y);
        this.drawP4 = p.getPointOfScreen(this.point4.x, this.point4.y);
        let path = new Path2D();
        path.moveTo(this.drawP1.x, this.drawP1.y);
        path.bezierCurveTo(this.drawP2.x, this.drawP2.y, this.drawP3.x, this.drawP3.y, this.drawP4.x, this.drawP4.y);
        this.path = path;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.lineWidth = this.lineWidth;
        ctx.fill(this.path);
        ctx.stroke(this.path);
    }
}
export class Text extends Position implements IShape {
    path: Path2D = new Path2D();
    string: string = "";
    fontSize: number;
    maxWidth: number;

    private drawFontSize = 0;
    private drawMaxwidth = 0;
    private drawPosition!: { x: number; y: number; }
    private textAlign: CanvasTextAlign;

    constructor(text: string, textAlign: CanvasTextAlign = "left", x: number, y: number, fontSize = 0.05, maxWidth = 0.1) {
        super(x, y);
        this.string = text;
        this.fontSize = fontSize;
        this.maxWidth = maxWidth;
        this.textAlign = textAlign;
    }

    reSize(p: PathData) {
        this.drawFontSize = p.getPointOfScreen(this.fontSize, 0).x;
        this.drawMaxwidth = p.getPointOfScreen(this.maxWidth, 0).x;
        this.drawPosition = p.getPointOfScreen(this.x, this.y);
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.textAlign = this.textAlign;
        ctx.font = `${Math.floor(this.drawFontSize)}px Verdana`;
        ctx.fillText(this.string, this.drawPosition.x, this.drawPosition.y, this.drawMaxwidth);
    }
}
export class PolyLine extends Position implements IShape {
    path: Path2D = new Path2D();
    start: Point;
    stop: Point;
    points: Point[];

    private drawStart!: Point;
    private drawStop!: Point;
    private drawPoints!: Point[];
    constructor(points: Point[], start: Point, stop: Point) {
        super();
        this.points = points;
        this.start = start;
        this.stop = stop;
    }

    reSize(p: PathData) {
        this.drawPoints = []; //clear old data
        this.drawStart = p.getPointOfScreen(this.start.x, this.start.y);
        this.drawStop = p.getPointOfScreen(this.stop.x, this.stop.y);
        this.points.forEach(ps => {
            this.drawPoints.push(p.getPointOfScreen(ps.x, ps.y));
        });
    }

    draw(ctx: CanvasRenderingContext2D) {
        let path = new Path2D();
        path.moveTo(this.drawStart.x, this.drawStart.y);
        this.drawPoints.forEach(point => {
            path.lineTo(point.x, point.y);
        });
        path.lineTo(this.drawStop.x, this.drawStop.y);
        this.path = path;
        ctx.fill(this.path);
        ctx.stroke(this.path);

    }
}
export class Img extends Position implements IShape {
    path: Path2D = new Path2D();
    image = new Image();
    private drawStartPoint!: Point;
    private drawWH: { w: number; h: number };
    constructor(src = "", x = 0, y = 0, w = 0.2, h = 0.2) {
        super(x, y, w, h);
        this.image.src = src;
        this.image.crossOrigin = "anonymous";
        this.drawWH = { w: 0, h: 0 }
    }

    reSize(p: PathData) {
        this.drawStartPoint = p.getPointOfScreen(this.x, this.y);
        this.drawWH.w = p.getPointOfScreen(this.w, this.h).x;
        this.drawWH.h = p.getPointOfScreen(this.w, this.h).y;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.drawImage(this.image, this.drawStartPoint.x, this.drawStartPoint.y, this.drawWH.w, this.drawWH.h)
    }
}

export class Style {
    fillStyle: string | GradientBuilder = "transparent";
    strokeStyle: string | GradientBuilder = "transparent";
    lineWidth: number = 1;
}

export class PathData {
    Shape: Rect | Arc | Line | QuadraticCurveTo | BezierCurveTo | Text | PolyLine | Img | null = null;
    name: string = "";
    public width: number = 200;
    public height: number = 200;

    hoverStyle: Style = new Style();

    normalStyle: Style = new Style();
    //scale transform problem path&frame management
    fillStyle: string | GradientBuilder = "transparent";
    strokeStyle: string | GradientBuilder = "transparent";
    lineWidth: number = 1;

    runUpdateSelf = (p: PathData): void => { };

    runMainUpDate(): void {
        this.runUpdateSelf(this);
        this.reSize();
    }

    mouseEvent = (mouseIn: boolean, mouseDown: boolean, path: PathData): void => { };

    //mouse event call by canvas
    mouseIn(isMouseDown: boolean): void {
        this.strokeStyle = this.hoverStyle.strokeStyle || this.strokeStyle;
        this.fillStyle = this.hoverStyle.fillStyle || this.fillStyle;
        this.lineWidth = this.hoverStyle.lineWidth || this.lineWidth;
        this.mouseEvent(true, isMouseDown, this); //mousehover ,mouseDown,object
    }
    //mouse event call by canvas
    mouseOut(isMouseDown: boolean): void {
        this.strokeStyle = this.normalStyle.strokeStyle || this.strokeStyle;
        this.fillStyle = this.normalStyle.fillStyle || this.fillStyle;
        this.lineWidth = this.normalStyle.lineWidth || this.lineWidth;
        this.mouseEvent(false, isMouseDown, this); //mousehover ,mouseDown,object
    }

    private reSize() {
        this.Shape?.reSize(this);
    }

    public getPointOfScreen(x: number, y: number): { x: number, y: number } {
        return { x: this.width * x, y: this.height * y };
    }
}

export class Canvas {

    private pathsData: PathData[] = [];
    height: number = 200;
    width: number = 200;
    ctx!: CanvasRenderingContext2D;


    mousePosition: { x: number; y: number } = { x: 0, y: 0 };
    mouseDown: boolean = false;
    backGroundColor: string | GradientBuilder = 'gray';

    addBeforePath(path: PathData) {
        this.pathsData = [path, ...this.pathsData];
    }
    addAfterPath(path: PathData) {
        this.pathsData = [...this.pathsData, path];
    }
    getPath(name: string): PathData | undefined {
        return this.pathsData.find(x => x.name === name);
    }
    updatePath(path: PathData) {
        this.pathsData.map(x => x.name === path.name ? { ...path } : { ...x });
    }
    removePath(pathName: string) {
        this.pathsData.filter(p => p.name !== pathName);
    }
    draw() { //look at gpu usage. this is hardware render.

        this.ctx?.clearRect(0, 0, this.width, this.height);
        if (this.backGroundColor instanceof GradientBuilder) {
            this.ctx.fillStyle = this.backGroundColor.getColorStop(this.ctx);
        } else {
            this.ctx.fillStyle = this.backGroundColor;// this.backGroundColor;
        }

        this.ctx?.fillRect(0, 0, this.width, this.height);

        this.pathsData.forEach(p => {
            p.width = this.width;
            p.height = this.height;

            if (!p.Shape) {
                console.warn("shap data is null");
            }
            const path = p.Shape?.path ?? new Path2D();

            p.runMainUpDate();

            const isPath = this.ctx?.isPointInPath(path, this.mousePosition.x, this.mousePosition.y)
            if (isPath) {
                //use effect [mousepositionin canvas]
                p.mouseIn(this.mouseDown);
            } else {
                p.mouseOut(this.mouseDown);
            }

            //fill color
            if (p.fillStyle instanceof GradientBuilder) {
                this.ctx.fillStyle = p.fillStyle.getColorStop(this.ctx);
            } else {
                this.ctx.fillStyle = p.fillStyle;
            }

            //stroke color
            if (p.strokeStyle instanceof GradientBuilder) {
                this.ctx.strokeStyle = p.strokeStyle.getColorStop(this.ctx);
            } else {
                this.ctx.strokeStyle = p.strokeStyle;
            }

            p.Shape?.draw(this.ctx);

        });

    }
}