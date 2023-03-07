import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import Modal from './components/modal'
import Canvas from './components/canvas'
import Menu from './components/menu'
import useCanvas from './hooks/useCanvas'
import { VERTICAL_MENU_WIDTH, HORIZONTAL_MENU_HEIGHT } from './constants/constants'
import { POSITIONS } from './constants/enums';
import { ImageData } from './types/interfaces';
import { Position } from './types/types';
import './app.scss';

const App = () => {
    const [position, setPosition] = useState<Position>(POSITIONS.RIGHT)
    const [imageData, setImageData] = useState<ImageData>({name: '', url: ''})
    const {
        canvasRef,
        bgCanvasRef,
        init,
        canvasWidth,
        canvasHeight,
        changeCanvasWidth,
        changeCanvasHeight,
        clearCanvas,
        isEmptyCanvas,
        context,
        bgContext,
        ...controls
    } = useCanvas();

    useEffect(() => {
        init();
    }, [position])

    useEffect(() => {
        const showAlert = (event: BeforeUnloadEvent) => {
            if (!isEmptyCanvas(canvasRef.current) && !isEmptyCanvas(bgCanvasRef.current)) {
                event.preventDefault();
                return event.returnValue = 'Your changes will not be saved, continue?'
            }
        }

        window.addEventListener("beforeunload", showAlert)

        return () => window.removeEventListener("beforeunload", showAlert);
    })

    const isConfirmedChanges = () => {
        if (!isEmptyCanvas(canvasRef.current) && !isEmptyCanvas(bgCanvasRef.current)) {
            if (!window.confirm('Your changes will not be saved, continue?')) {
                return false;
            }

            return true;
        } else {
            return true;
        }
    }

    const changePosition = (position: Position) => {
        if (!isConfirmedChanges()) {
            return;
        }

        if (position === POSITIONS.TOP || position === POSITIONS.BOTTOM) {
            changeCanvasHeight(window.innerHeight - HORIZONTAL_MENU_HEIGHT)
            changeCanvasWidth(window.innerWidth)
        } else {
            changeCanvasHeight(window.innerHeight)
            changeCanvasWidth(window.innerWidth - VERTICAL_MENU_WIDTH)
        }

        setPosition(position);
    }

    const onDownload = () => {
        if (bgCanvasRef.current && canvasRef.current && bgContext.current) {
            bgContext.current.drawImage(canvasRef.current, 0, 0);

            setImageData({
                name: 'canvas_image.png',
                url: bgCanvasRef.current.toDataURL("image/png")
            });
        }
    }

    return (
        <div className="container">
            <Canvas
                canvasRef={canvasRef}
                bgCanvasRef={bgCanvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={`canvas-position_${position}`}
            />
            <Menu
                onDownload={onDownload}
                imageData={imageData}
                changePosition={changePosition}
                clearCanvas={clearCanvas}
                position={position}
                className={`menu-position menu-position_${position}`}
                {...controls}
            />
            <Modal />
        </div>
    )
}

export default App;
