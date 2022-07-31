const ad = DocumentApp.getActiveDocument();
var body = ad.getBody();
var pg = body.getParagraphs();

const black = {};
black[DocumentApp.Attribute.FOREGROUND_COLOR] = '#000000';
black[DocumentApp.Attribute.BACKGROUND_COLOR] = '#000000';
const white = {};
white[DocumentApp.Attribute.FOREGROUND_COLOR] = '#ffffff';
white[DocumentApp.Attribute.BACKGROUND_COLOR] = '#ffffff';

function onOpen(e)
{
  const ui = DocumentApp.getUi().createMenu('Bad Apple')
  ui.addItem('Bad Apple', 'doGet');
  ui.addToUi();
}

function pad(num, size) {
  while (num.length < size) { num = "0" + num; }
  return num;
}

function setAT(paragraph, arr)
{
  for(t = 1; t < arr[1].length; t++)
  {
    if(arr[1].charAt(t) == 1)
    {
      paragraph.setAttributes(t, t, black)
    }
    else if(arr[1].charAt(t) == 0)
    {
      paragraph.setAttributes(t, t, white);
    }
  }
}

function doGet(e)
{ 
  // 1 sec
  var fh = pg[1].getText();
  var frame = parseInt(fh) + 1;
  var filename = ('frame' + pad(frame.toString(), 5) + '.png.txt');

  file = DriveApp.getFilesByName(filename); 
  
  var foo = file.next();
  var text = foo.getBlob().getDataAsString('utf8');
  var arr = text.split(",");
  // 1 sec

  pg[1].setText(frame);
  pg[2].setText('A');

  if(arr[1].charAt(0) == 1)
  {
    pg[2].setAttributes(black);
  }
  else if(arr[1].charAt(0) == 0)
  {
    pg[2].setAttributes(white);
  }

  var at = pg[2].appendText('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
  
  setAT(at, arr);

  return HtmlService.createHtmlOutputFromFile('Draw');
}
