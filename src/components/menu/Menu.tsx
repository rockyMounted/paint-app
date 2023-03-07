import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Brush, Eraser, Fill } from '../../icons/icons';
import {
  DEFAULT_BRUSH_SIZE,
  DEFAULT_BG_COLOR,
  DEFAULT_BRUSH_COLOR,
  DEFAULT_BRUSH_OPACITY,
  BUTTON_MODE
} from '../../constants/constants';
import { TOOLS, POSITIONS } from '../../constants/enums'
import { ImageData } from '../../types/interfaces';
import { Position, Tool } from '../../types/types';
import RadioControl from '../radio-control';
import Button from '../button';
import './Menu.scss';

const defaultBrushStyle = {
  backgroundColor: DEFAULT_BRUSH_COLOR,
  borderRadius: '50%',
  width: `${DEFAULT_BRUSH_SIZE}px`,
  height: `${DEFAULT_BRUSH_SIZE}px`,
}

type ToolsList = Array<{
  name: Tool,
  icon: JSX.Element
}>

type MenuProps = {
  imageData: ImageData,
  position: Position,
  changePosition: (position: Position) => void,
  currentTool: Tool,
  clearCanvas: () => void,
  onDownload: () => void,
  changeBrushLineWidth: (value: number) => void,
  changeBrushOpacity: (value: number) => void,
  changeBrushColor: (value: string) => void,
  changeBackgroundColor: (value: string) => void,
  changeCurrentTool: (tool: Tool) => void,
  className?: string
}

const Menu = (props: MenuProps) => {
  const { changePosition, position, imageData, className } = props;
  const [brushOpacity, setBrushOpacity] = useState(DEFAULT_BRUSH_OPACITY);
  const [currentTool, setCurrentTool] = useState(props.currentTool);
  const [brushSize, setBrushSize] = useState(DEFAULT_BRUSH_SIZE);
  const [brushColor, setBrushColor] = useState(DEFAULT_BRUSH_COLOR);
  const [bgColor, setBgColor] = useState(DEFAULT_BG_COLOR);
  const [brushStyle, setBrushStyle] = useState(defaultBrushStyle)

  useEffect(() => {
    setBrushStyle({
      backgroundColor: brushColor,
      borderRadius: '50%',
      width: `${brushSize}px`,
      height: `${brushSize}px`,
    })
  }, [brushColor, brushSize])

  useEffect(() => {
    clearCanvas()
  }, [position])

  const changeBrushLineWidth = (value: number) => {
    props.changeBrushLineWidth(value)
    setBrushSize(value)
  }

  const changeBrushOpacity = (value: number) => {
    props.changeBrushOpacity(value / 10)
    setBrushOpacity(value)
  }

  const changeBrushColor = (color: string) => {
    setBrushColor(color)
    props.changeBrushColor(color)
  }

  const changeBgColor = (color: string) => {
    props.changeBackgroundColor(color)
    setBgColor(color)
  }

  const changeCurrentTool = (tool: Tool) => {
    props.changeCurrentTool(tool)
    setCurrentTool(tool)
  }

  const renderPositionsMenu = () => {
    const positionsList = Object.values(POSITIONS)

    return (
      <div className="positions-block">
        {positionsList.map(item => (
          <button
            key={item}
            className={item.toLowerCase()}
            disabled={position === item}
            onClick={() => changePosition(item)}
          />
        ))}
      </div>
    )
  }

  const renderToolsMenu = () => {

    const toolsList: ToolsList = [
      {
        name: TOOLS.BRUSH,
        icon: <Brush />
      },
      {
        name: TOOLS.ERASER,
        icon: <Eraser />
      },
      {
        name: TOOLS.FILL,
        icon: <Fill />
      }
    ];

    return (
      <div className="tools_block">
        {toolsList.map(({ icon, name })=> (
          <button
            key={name}
            className={name.toLowerCase()}
            onClick={() => changeCurrentTool(name)}
            disabled={currentTool === name}
          >
            {icon}
          </button>
        ))}
      </div>
    )
  }

  const clearCanvas = () => {
    props.clearCanvas();
    changeBrushLineWidth(DEFAULT_BRUSH_SIZE);
    changeBrushOpacity(DEFAULT_BRUSH_OPACITY);
    changeBrushColor(DEFAULT_BRUSH_COLOR);
    changeBgColor(DEFAULT_BG_COLOR);
    setBrushStyle(defaultBrushStyle);
  };

  const onDownload = async () => {
    await props.onDownload();

    clearCanvas();
  };

  return (
    <div className={classNames('menu-container', position, className)}>
      <div className="menu_controls">
        {renderPositionsMenu()}
        <div className="brush-appearance_block">
          <span
            className='brush'
            style={brushStyle}
          />
        </div>
        <div className="tools_controls">
          <div className="color_block">
            <input
              type="color"
              id="brushColor"
              value={brushColor}
              disabled={currentTool === TOOLS.ERASER || currentTool === TOOLS.FILL}
              onChange={(event) => changeBrushColor(event.currentTarget.value)}
            />
            <input
              type="color"
              id="bgColor"
              value={bgColor}
              disabled={currentTool === TOOLS.ERASER || currentTool === TOOLS.BRUSH}
              onChange={(event) => changeBgColor(event.currentTarget.value)}
            />
          </div>
          {renderToolsMenu()}
        </div>
        <div className="radio_controls">
          <RadioControl
            className="size"
            label='size'
            id="size"
            defaultValue={brushSize}
            min={1}
            max={100}
            disabled={currentTool === TOOLS.FILL}
            onChange={changeBrushLineWidth}
          />
          <RadioControl
            className="opacity"
            label="opacity"
            id="opacity"
            disabled={currentTool === TOOLS.ERASER || currentTool === TOOLS.FILL}
            defaultValue={brushOpacity}
            min={0}
            max={10}
            onChange={changeBrushOpacity}
          />
        </div>
      </div>
      <div className="buttons">
        <Button className="clear" onClick={() => clearCanvas()} label='clear'/>
        <Button
          className="save"
          onClick={onDownload}
          label='save image'
          mode={BUTTON_MODE.LINK}
          href={imageData?.url}
          download={imageData?.name}
        />
      </div>
    </div>
  )
}

export default Menu;
