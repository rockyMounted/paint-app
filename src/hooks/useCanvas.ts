import { useRef, useState, useEffect, RefObject } from 'react';
import {
  VERTICAL_MENU_WIDTH,
  DEFAULT_BRUSH_SIZE,
  DEFAULT_BG_COLOR,
  DEFAULT_BRUSH_COLOR
} from '../constants/constants';
import { TOOLS } from '../constants/enums'
import { Tool } from '../types/types'

const useCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgContext = useRef<CanvasRenderingContext2D | null>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawing = useRef(false);
  const prevX = useRef(0);
  const prevY = useRef(0);
  const isEraser = useRef(false);
  const [canvasWidth, setCanvasWidth] = useState(window.innerWidth - VERTICAL_MENU_WIDTH);
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight);
  let currentTool: Tool = TOOLS.BRUSH;

  useEffect(() => {
    if (canvasRef.current && bgCanvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
      bgContext.current = bgCanvasRef.current.getContext("2d")
    }
  }, []);

  const setBrushParams = () => {
    if (context.current) {
      context.current.strokeStyle = DEFAULT_BRUSH_COLOR;
      context.current.lineWidth = DEFAULT_BRUSH_SIZE;
      context.current.lineJoin = "round";
      context.current.lineCap = "round";
    }
  }

  const handleMouseDown = (event: MouseEvent) => {
    if (currentTool !== TOOLS.FILL && context.current) {
      isDrawing.current = true
      context.current.beginPath();
      prevX.current = event.offsetX;
      prevY.current = event.offsetY;
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (isDrawing?.current && canvasRef?.current && context?.current) {
      context.current.moveTo(prevX.current, prevY.current);
      context.current.lineTo(event.offsetX, event.offsetY);
      context.current.stroke();

      prevX.current = event.offsetX;
      prevY.current = event.offsetY;

      context.current.globalCompositeOperation = isEraser.current ? 'destination-out' : "source-over"
    }
  }

  const init = () => {
    if (context?.current && canvasRef?.current && bgContext?.current && bgCanvasRef?.current) {
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);

      changeBackgroundColor(DEFAULT_BG_COLOR);
      setBrushParams();
    }
  }

  const changeBrushColor = (color: string) => {
    if (context.current) {
      context.current.strokeStyle = color;
    }
  }

  const changeBrushLineWidth = (width: number) => {
    if (context.current && canvasRef.current) {
      context.current.lineWidth = width;
    }
  }

  const changeCanvasWidth = (value: number) => {
    setCanvasWidth(value)
    if (context.current && bgContext.current) {
        // @ts-ignore
      context.current.width = value;
        // @ts-ignore
      bgContext.current.width = value;
    }
  }

  const changeCanvasHeight = (value: number) => {
    setCanvasHeight(value);
    if (context.current && bgContext.current) {
        // @ts-ignore
      context.current.height = value;
        // @ts-ignore
      bgContext.current.height = value;
    }
  }

  const changeBrushOpacity = (value: number) => {
    if (context.current && canvasRef.current) {
      context.current.globalAlpha = value
    }
  }

  const changeCurrentTool = (tool: Tool) => {
    currentTool = tool;
    isEraser.current = tool === TOOLS.ERASER
  }

  const changeBackgroundColor = (value: string) => {
    if (bgCanvasRef.current && bgContext.current) {
      // @ts-ignore
      bgContext.current.globalCompositeOperation = 'destination-under'
      bgContext.current.fillStyle = value;
      bgContext.current.fillRect(0, 0, bgCanvasRef.current.width, bgCanvasRef.current.height);
    }
  }

  const clearCanvas = () => {
    if (context?.current && canvasRef?.current && bgContext?.current && bgCanvasRef?.current) {
      bgContext.current.clearRect(0, 0, bgCanvasRef.current.width, bgCanvasRef.current.height);
      context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      init();
    }
  }

  const isEmptyCanvas = (canvas: any) => {
    return !canvas.getContext('2d')
      .getImageData(0, 0, canvas.width, canvas.height).data
      .some((channel: number) => channel !== 0)
  }

  return {
    context,
    bgContext,
    canvasRef,
    bgCanvasRef,
    init,
    changeBrushColor,
    changeBrushLineWidth,
    changeBrushOpacity,
    clearCanvas,
    changeCanvasWidth,
    changeCanvasHeight,
    changeBackgroundColor,
    changeCurrentTool,
    isEmptyCanvas,
    canvasWidth,
    canvasHeight,
    DEFAULT_BG_COLOR,
    currentTool,
    DEFAULT_BRUSH_SIZE,
    DEFAULT_BRUSH_COLOR,
  }
}

export default useCanvas;
