
  function DownloadXML(context, filename){

    const APIURL = '192.168.0.34:3000/export';



    // May need to Json stringify Data

    var reqOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        body: {
          data: context,
          filename: filename
        }
      }
    };


  fetch(APIURL, reqOptions).then(
    response =>{
      if (!response.ok){
        throw new Error (`Http request error!: ${response.status}`)
      }
      return response.json();
    }
  ).then(
    data =>{ console.log(data)}
  ).catch(error =>{console.error("error", error);})   

    var download = document.createElement('a');
    var file = document.createElement('a');
    file.setAttribute('href', 'data:text/plain; charset=utf-8,' + encodeURIComponent(context));
    file.setAttribute('download',filename);
    file.click();
  }

  document.addEventListener('dblclick', function(evt)
  {
  


    var url = 'https://www.draw.io/?embed=1&ui=atlas&spin=1&modified=unsavedChanges&proto=json';
    var source = evt.srcElement || evt.target;

    if (source.nodeName == 'IMG' && source.className == 'drawio')
    {
      if (source.drawIoWindow == null || source.drawIoWindow.closed)
      {
        // Implements protocol for loading and exporting with embedded XML
        var receive = function(evt)
        {
          if (evt.data.length > 0 && evt.source == source.drawIoWindow)
          {
            console.log(source.getAttribute('src'));
            var msg = JSON.parse(evt.data);
 
            // Received if the editor is ready
            console.log('Message Event: ', msg.event)
            if (msg.event == 'init')
            {
              // Sends the data URI with embedded XML to editor
              console.log('Initialization Data: \n' , source.getAttribute('src'));
              source.drawIoWindow.postMessage(JSON.stringify(
                {action: 'load', xmlpng: source.getAttribute('src')}), '*');
            }
            
            // Received if the user clicks save
            else if (msg.event == 'save')
            {
              // Sends a request to export the diagram as XML with embedded PNG

              source.drawIoWindow.postMessage(JSON.stringify(
                {action: 'export', format: 'xmlpng', spinKey: 'saving'}), '*');
                console.log('Exporting Save Data' );
            }
            // Received if the export request was processed
            else if (msg.event == 'export')
            {
              // Updates the data URI of the image
              DownloadXML(msg.xml)
              source.setAttribute('src', msg.data);

              " + TextImageString.Id + ".value = msg.data;
              document.getElementById('" + Save.Id + "').click();
            }
                         
            // Received if the user clicks exit or after export
            if (msg.event == 'exit')// ||  msg.event == 'export')
            {
              // Closes the editor

              window.removeEventListener('message', receive);
              source.drawIoWindow.close();
              source.drawIoWindow = null;
            }
          }
        };
 
        // Opens the editor
        window.addEventListener('message', receive);
        source.drawIoWindow = window.open(url);
      }
      else
      {
        // Shows existing editor window
        source.drawIoWindow.focus();
      }
    }
  });