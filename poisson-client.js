$('#ReloadButton').click(function() {
  var ctx = $('#Result')[0].getContext('2d'),
      srcImg = $('#Src')[0].src,
      dstImg = $('#Dst')[0].src,
      maskImg = $('#Mask')[0].src,
      info = $('#Info'),
      iter = 0,
      isReset = false;
  
  ctx.fillStyle = '#333333';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  
  Poisson.load(srcImg, dstImg, maskImg, function(data) {
    ctx.putImageData(Poisson.reset(), 0, 0);
    var offsetX = 5, offsetY = -7;
    $('#BlendButton').click(function() {
      try {
        var ts = new Date().getTime();
        Poisson.reset();
        var result = Poisson.blend(50, offsetX, offsetY);
        ctx.putImageData(result, 0, 0);
        var time = (new Date().getTime() - ts).toString();
        info.text('blend complete, ' + time + ' ms');
        isReset = false;
      } catch (e) {
        info.text(e);
      }
    });
    $('#IterateButton').click(function() {
      try {
        if(!isReset) {
          Poisson.reset();
          iter = 0;
          isReset = true;
        }
        iter++;
        info.text('iteration ' + iter);
        var result = Poisson.blend(1, offsetX, offsetY);
        ctx.putImageData(result, 0, 0);
      } catch (e) {
        info.text(e);
      }
    });
    $('#PasteButton').click(function() {
      try {
        Poisson.reset();
        var result = Poisson.blend(1, offsetX, offsetY, true);
        ctx.putImageData(result, 0, 0);
        info.text('paste complete');
        isReset = false;
      } catch (e) {
        info.text(e);
      }
    });
    $('#ResetButton').click(function() {
      iter = 0;
      info.text('');
      ctx.putImageData(Poisson.reset(), 0, 0);
    });
  });
});
