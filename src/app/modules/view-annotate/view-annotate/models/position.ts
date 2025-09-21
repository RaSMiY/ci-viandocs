export interface Position {
  left: number;
  top: number;
}

/**
 * Размерный контекст - ширина, высота контейнера и масштаб.
 */
export interface DimensionsContext {
  width: number;
  height: number;
  zoom: number;
}
