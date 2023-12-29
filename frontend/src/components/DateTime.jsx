

// function dateTimeFormat({ todos }) {
//   const formatDateTime = (dateTimeString) => {
//     const currentDate = new Date();
//     const inputDate = new Date(dateTimeString);

//     const longFormatOptions = {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//       second: 'numeric',
//       timeZoneName: 'short',
//     };

//     const shortFormatOptions = {
//       year: 'numeric',
//       month: 'numeric',
//       day: 'numeric',
//       hour: 'numeric',
//       minute: 'numeric',
//     };

//     const isBefore2021 = inputDate.getFullYear() < 2021;

//     return isBefore2021
//       ? inputDate.toLocaleString('en-US', longFormatOptions)
//       : inputDate.toLocaleString('en-US', shortFormatOptions);
//   };

//   return (
//     formatDateTime
  
//   );
// }

// export default dateTimeFormat;
