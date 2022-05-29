

const imageUpload = document.getElementById('image')
Promise.all([
  faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
  faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
  faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)
let details
async function start() {
  const container = document.createElement('div')
  container.style.position = 'relative'
  document.body.append(container)
  
  let labeledFaceDescriptors
  let faceMatcher
  imageUpload.addEventListener('click', async () => {
    try{

      labeledFaceDescriptors = await loadLabeledImages()
    }catch(err){
      alert("face not detected")
      console.log(err)
    }
  faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.4)
})
  let image
  let canvas
  // document.body.append('Loaded')
  imageUpload.addEventListener('change', async () => {
    if (image) image.remove()
    if (canvas) canvas.remove()
    image = await faceapi.bufferToImage(imageUpload.files[0])
    // container.append(image)
    canvas = faceapi.createCanvasFromMedia(image)
    container.append(canvas)
    const displaySize = { width: image.width, height: image.height }
    faceapi.matchDimensions(canvas, displaySize)
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()
    const resizedDetections = faceapi.resizeResults(detections, displaySize)
    try{
      const results = resizedDetections.map(d => faceMatcher.findBestMatch(d.descriptor))
      console.log('result',resizedDetections)
      results.forEach((result, i) => {
        const box = resizedDetections[i].detection.box
        console.log('test',result.toString())
        const drawBox = new faceapi.draw.DrawBox(box, { label: result.toString() })
        
        var lock = result.toString().split(" ")[0];
        if(lock === "unknown")
        {
          alert("face not matched try again");
          window.location.href = "/signin";
        }
        else{
          alert('face matched');
        }
        
      })
    }catch(err){
      alert("face not detected")
      console.log(err)
    }
  })
}


function loadLabeledImages() {
  console.log('hi')
  let name = document.getElementById('name').value.split(" ").join("");
  let Phone_no = document.getElementById('Phone_no').value;
  name=name.toLowerCase();
  const labels = [name]
  console.log(labels)
  return Promise.all(
    labels.map(async label => {
      const descriptions = []
      for (let i = 1; i <= 2; i++) {
        const img = await faceapi.fetchImage(`https://labeledface.s3.us-west-1.amazonaws.com/${name+Phone_no}${i}.jpg`,(err)=>
        {
          console.log(err)
          alert("wrong credentials")
        })
        console.log(img)
        const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
        descriptions.push(detections.descriptor)
        console.log(descriptions)
      }
      
      
      return new faceapi.LabeledFaceDescriptors(label, descriptions)
    })
  )
}