

export default useLandscape = ( ) => {
   const dimensions = useDimensions();
   const { width , height } = dimensions.window;
   return width >= height;
}
