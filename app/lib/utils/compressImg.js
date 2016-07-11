/**
 * Created by vincent on 2016/7/10.
 */
var compressImg;
(function () {

    compressImg = {
        /**
         * Receives an Image Object (can be JPG OR PNG) and returns a new Image Object compressed
         * @param {Image} sourceImg The source Image Object
         * @param {String} mimeType
         * @param {Integer} quality The output quality of Image Object
         * @return {Image} resultImg The compressed Image Object
         */
        compress: function (sourceImg, mimeType, quality) {
            var maxWidth = 1024;
            var maxHeight = 1024;
            if (sourceImg.width > maxWidth || sourceImg.height > maxHeight) {
                var cvs = document.createElement('canvas');
                cvs.width = sourceImg.width;
                cvs.height = sourceImg.height;
                if (sourceImg.width > maxWidth) {
                    cvs.width = maxWidth;
                    cvs.height *= maxWidth / sourceImg.width;
                }
                else if (sourceImg.height > maxHeight) {
                    cvs.height = maxHeight;
                    cvs.width *= maxHeight / sourceImg.height;
                }
                var xRate = cvs.width / sourceImg.naturalWidth;
                var yRate = cvs.height / sourceImg.naturalHeight;
                //naturalWidth真实图片的宽度
                var cvsContext = cvs.getContext('2d');
                cvsContext.scale(xRate, yRate);
                var ctx = cvsContext.drawImage(sourceImg, 0, 0);
                var newImageData = cvs.toDataURL(mimeType, quality / 100);
                var resultImg = new Image();
                resultImg.src = newImageData;
                return resultImg;
            }
            else {
                return sourceImg;
            }
        }

    };

})();