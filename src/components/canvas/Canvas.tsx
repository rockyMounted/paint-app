import { LegacyRef } from 'react'
import classNames from 'classnames';
import './Canvas.scss';

type CanvasProps = {
  width: number,
  height: number,
  canvasRef: LegacyRef<HTMLCanvasElement> | null,
  bgCanvasRef: LegacyRef<HTMLCanvasElement> | null,
  className?: string
}

const Canvas = ({ width, height, canvasRef, bgCanvasRef, className }: CanvasProps) => (
  <>
    <canvas
      ref={canvasRef}
      className='canvas'
      width={width}
      height={height}
    />
    <canvas
      ref={bgCanvasRef}
      className={classNames('background-сanvas', className)}
      width={width}
      height={height}
    />
  </>
);

export default Canvas;
