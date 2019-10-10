export default navigator.getUserMedia ?
  navigator.getUserMedia :
  navigator.mediaDevices.getUserMedia;
// export default navigator.mediaDevices ?
//   navigator.mediaDevices.getUserMedia :
//   (
//     navigator.getUserMedia ||
//     navigator.webkitGetUserMedia ||
//     navigator.mozGetUserMedia
//   );
