export interface Position {
  left: number;
  top: number;
}
export interface PositionInPixels extends Position {}
export interface PositionInPercents extends Position {}
export interface DimensionsContext {
  width: number;
  height: number;
  zoom: number;
}
