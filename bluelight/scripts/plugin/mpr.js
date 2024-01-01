//MPR的選擇座標
var o3DPointX = 0;
var o3DPointY = 0;
//代表MPR模式為開啟狀態
var openMPR = false;


var buffer_mpr_X = 0;
var buffer_mpr_Y = 0;

function loadMPR() {
    var span = document.createElement("SPAN");
    span.innerHTML = `<img class="img MPR" alt="Old MPR" onmouseover = "onElementOver(this);" onmouseleave = "onElementLeave();" id="ImgMPR" src="../image/icon/black/b_AdvancedMode_off.png" width="50" height="50">`;
    getByid("icon-list").appendChild(span);

    var span = document.createElement("SPAN");
    span.innerHTML = `<label style="color: #ffffff;" id="mprLightLabel">position<input type="checkbox" checked="true" name="mprLight"
    id="mprLight"></label>`
    getByid("page-header").appendChild(span);
    getByid("mprLightLabel").style.display = "none";
}
loadMPR();

function loadMPR_UI() {
    if (!getByid("MouseOperation_MPR")) {
        var img = document.createElement("IMG");
        img.src = getByid("MouseOperation").src;
        img.id = "MouseOperation_MPR";
        img.className = "MPR_icon";
        img.width = img.height = "50";
        img.style.filter = "sepia(100%)"
        getByid("MouseOperation_span").appendChild(img);
    }
    if (!getByid("WindowRevision_MPR")) {
        var img = document.createElement("IMG");
        img.src = getByid("WindowRevision").src;
        img.id = "WindowRevision_MPR";
        img.className = "MPR_icon";
        img.width = img.height = "50";
        img.style.filter = "sepia(100%)"
        getByid("WindowRevision_span").appendChild(img);
    }
    if (!getByid("b_Scroll_MPR")) {
        var img = document.createElement("IMG");
        img.src = getByid("b_Scroll").src;
        img.id = "b_Scroll_MPR";
        img.className = "MPR_icon";
        img.width = img.height = "50";
        img.style.filter = "sepia(100%)"
        getByid("b_Scroll_span").appendChild(img);
    }
    if (!getByid("MouseRotate_MPR")) {
        var img = document.createElement("IMG");
        img.src = getByid("MouseRotate").src;
        img.id = "MouseRotate_MPR";
        img.className = "MPR_icon";
        img.width = img.height = "50";
        img.style.filter = "sepia(100%)"
        getByid("MouseRotate_span").appendChild(img);
    }
}
loadMPR_UI();
getByid("MouseOperation_MPR").style.display = "none";
getByid("WindowRevision_MPR").style.display = "none";
getByid("b_Scroll_MPR").style.display = "none";
getByid("MouseRotate_MPR").style.display = "none";
//getByid("WindowLevelDiv_MPR").style.display = "none";

function enterMPR_UI() {
    getByid("MouseOperation_MPR").style.display = "";
    getByid("WindowRevision_MPR").style.display = "";
    getByid("b_Scroll_MPR").style.display = "";
    getByid("MouseRotate_MPR").style.display = "";
    //getByid("WindowLevelDiv_MPR").style.display = "";
    getByid("MouseOperation").style.display = "none";
    getByid("WindowRevision").style.display = "none";
    getByid("WindowLevelDiv").style.display = "none";
    getByid("b_Scroll").style.display = "none";
    getByid("MouseRotate").style.display = "none";
    openLeftImgClick = false;
}

function exitMPR_UI() {
    getByid("MouseOperation_MPR").style.display = "none";
    getByid("WindowRevision_MPR").style.display = "none";
    getByid("b_Scroll_MPR").style.display = "none";
    getByid("MouseRotate_MPR").style.display = "none";
    //getByid("WindowLevelDiv_MPR").style.display = "none";
    getByid("MouseOperation").style.display = "";
    getByid("WindowRevision").style.display = "";
    getByid("WindowLevelDiv").style.display = "";
    getByid("b_Scroll").style.display = "";
    getByid("MouseRotate").style.display = "";
    openLeftImgClick = true;
}

function drawBorderMPR(element) {
    var MPR_icon = getClass("MPR_icon");
    for (var i = 0; i < MPR_icon.length; i++) Css(MPR_icon[i], 'border', "");
    Css(element, 'border', 3 + "px #FFFFFF solid");
    Css(element, 'borderRadius', "3px 3px 3px 3px");
}

getByid("b_Scroll_MPR").onclick = function () {
    if (this.enable == false) return;
    //BL_mode = 'scroll';
    set_BL_model('scroll');
    scroll();
    Touchmove = function (e, e2) {

        var currX = getCurrPoint(e)[0];
        var currY = getCurrPoint(e)[1];
        if (e2) {
            var currX2 = getCurrPoint(e2)[0];
            var currY2 = getCurrPoint(e2)[1];
        }
        if (TouchDownCheck == true && rightTouchDown == false) {
            var nextInstanceNumber = -1;
            var sop = GetNewViewport().sop;
            let index = SearchUid2Index(sop);
            // if (!index) continue;
            let i = index[0],
                j = index[1],
                k = index[2];
            var Onum = parseInt(Patient.Study[i].Series[j].Sop[k].InstanceNumber);
            var list = sortInstance(sop);
            for (l = 0; l < list.length; l++) {
                if (list[l].InstanceNumber == Onum) {
                    break;
                }
            }
            if (Math.abs(currY - GetViewport().originalPointY) < Math.abs(currX - GetViewport().originalPointX)) {
                if (currX < GetViewport().originalPointX - 3) {
                    GetNewViewport().nextFrame(true);
                } else if (currX > GetViewport().originalPointX + 3) {
                    GetNewViewport().nextFrame(false);
                }
            } else {
                if (currY < GetViewport().originalPointY - 3) {
                    GetNewViewport().nextFrame(true);
                } else if (currY > GetViewport().originalPointY + 3) {
                    GetNewViewport().nextFrame(false);
                }
            }
            GetViewport().originalPointX = currX;
            GetViewport().originalPointY = currY;
            if (openMPR == true && nextInstanceNumber > -1) {
                Anatomical_Section(nextInstanceNumber);
                Anatomical_Section2(nextInstanceNumber);
            }
        }
    }
    drawBorderMPR(this);
}

getByid("WindowRevision_MPR").onclick = function () {
    if (this.enable == false) return;
    //BL_mode = 'scroll';
    set_BL_model('windowlevel');
    windowlevel();
    drawBorderMPR(this);
}

getByid("MouseRotate_MPR").onclick = function () {
    if (this.enable == false) return;
    //BL_mode = 'scroll';
    set_BL_model('rotate');
    rotate();
    drawBorderMPR(this);
}

getByid("MouseOperation_MPR").onclick = function () {
    if (this.enable == false) return;
    //BL_mode = 'mouseTool_MPR';
    var MPR_div = getClass("MPR_div");
    for (var i = 0; i < MPR_div.length; i++) MPR_div[i].style.display = "none";
    set_BL_model('mouseTool_MPR');
    GetNewViewport(2).div.removeEventListener("mousemove", Mousemove, false);
    GetNewViewport(2).div.removeEventListener("mousedown", Mousedown, false);
    GetNewViewport(2).div.removeEventListener("mouseup", Mouseup, false);
    /// GetNewViewport(2).div.removeEventListener("touchstart", TouchstartF, false);
    /// GetNewViewport(2).div.removeEventListener("touchmove", TouchmoveF, false);
    /// GetNewViewport(2).div.removeEventListener("touchend", TouchendF, false);
    GetNewViewport(2).div.removeEventListener("wheel", Wheel, false);

    Wheel = function (e) {
        if (!openMPR) return;
        var viewport = GetViewport(), canvas = viewport.canvas();
        var nextInstanceNumber = 0;
        var break1 = false;
        var viewportNum = viewportNumber;

        for (var z = 0; z < Viewport_Total; z++) {
            var break1 = false;
            if (openLink == true) viewportNum = z;
            var currX1 = (e.pageX - canvas.getBoundingClientRect().left - GetViewport().newMousePointX - 100) * (GetNewViewport().width / parseInt(GetNewViewport().canvas.style.width));
            var currY1 = (e.pageY - canvas.getBoundingClientRect().top - GetViewport().newMousePointY - 100) * (GetNewViewport().height / parseInt(GetNewViewport().canvas.style.height));
            var sop = GetNewViewport(viewportNum).sop;
            try { var [i, j, k] = SearchUid2Index(viewport.sop) } catch (ex) { return; }
            var Onum = parseInt(Patient.Study[i].Series[j].Sop[k].InstanceNumber);
            var list = sortInstance(sop);
            if (list.length <= 1) continue;
            if (e.deltaY < 0) {
                for (var l = 0; l < list.length; l++) {
                    if (break1 == true) break;
                    if (list[l].InstanceNumber == Onum) {
                        if (l - 1 < 0) {
                            loadAndViewImage(list[list.length - 1].imageId, viewportNum);
                            nextInstanceNumber = list.length - 1;
                            break1 = true;
                            break;
                        }
                        loadAndViewImage(list[l - 1].imageId, viewportNum);
                        nextInstanceNumber = l - 1;
                        break1 = true;
                        break;
                    }
                }
            } else {
                for (var l = 0; l < list.length; l++) {
                    if (break1 == true) break;
                    if (list[l].InstanceNumber == Onum) {
                        if (l + 1 >= list.length) {
                            loadAndViewImage(list[0].imageId, viewportNum);
                            nextInstanceNumber = 0;
                            break1 = true;
                            break;
                        }
                        loadAndViewImage(list[l + 1].imageId, viewportNum);
                        nextInstanceNumber = l + 1;
                        break1 = true;
                        break;
                    }
                }
            }
            if (openLink == false) break;
        }
        Anatomical_Section(nextInstanceNumber);
        Anatomical_Section2(nextInstanceNumber);
    };

    Mousedown = function (e) {
        if (e.which == 1) MouseDownCheck = true;
        else if (e.which == 3) rightMouseDown = true;
        windowMouseX = GetmouseX(e);
        windowMouseY = GetmouseY(e);
        GetViewport().originalPointX = getCurrPoint(e)[0];
        GetViewport().originalPointY = getCurrPoint(e)[1];
    };

    Mousemove = function (e) {
        if (BL_mode != 'mouseTool_MPR') return;
        var viewport = GetNewViewport();
        if (!GetNewViewport().drawMark) GetViewportMark().getContext("2d").clearRect(0, 0, GetViewportMark().width, GetViewportMark().height);
        if (openMPR == true && openWindow != true && openChangeFile != true) {
            if (MouseDownCheck == true) {
                viewportNumber = 2;
                let angle2point = rotateCalculation(e);
                currX11M = angle2point[0];
                currY11M = angle2point[1];
                o3DPointX = currX11M;
                o3DPointY = currY11M;
                AngleXY0 = [currX11M, 0];
                AngleXY1 = [currX11M, viewport.height];
                if (openMPR == true) {
                    Anatomical_Section();
                    Anatomical_Section2();
                }
                display3DLine(currX11M, 0, currX11M, viewport.height, "rgb(38,140,191)");
                display3DLine(0, currY11M, viewport.width, currY11M, "rgb(221,53,119)");
            }
        }
    }

    Mouseup = function (e) {
        MouseDownCheck = false;
        rightMouseDown = false;
    }

    Touchmove = function (e, e2) {
        if (BL_mode != 'mouseTool_MPR') return;
        var viewport = GetNewViewport();
        if (!GetNewViewport().drawMark) GetViewportMark().getContext("2d").clearRect(0, 0, GetViewportMark().width, GetViewportMark().height);
        if (openDisplayMarkup && (getByid("DICOMTagsSelect").selected || getByid("AIMSelect").selected)) return;

        if (openMPR == true) {
            if (TouchDownCheck == true) {
                viewportNumber = 2;
                let angle2point = rotateCalculation(e);
                currX11M = angle2point[0];
                currY11M = angle2point[1];
                o3DPointX = currX11M;
                o3DPointY = currY11M;
                AngleXY0 = [currX11M, 0];
                AngleXY1 = [currX11M, viewport.height];
                if (openMPR == true) {
                    Anatomical_Section();
                    Anatomical_Section2();
                }
                display3DLine(currX11M, 0, currX11M, viewport.height, "rgb(38,140,191)");
                display3DLine(0, currY11M, viewport.width, currY11M, "rgb(221,53,119)");
            }
        }
    }
    GetNewViewport(2).div.addEventListener("mousemove", Mousemove, false);
    GetNewViewport(2).div.addEventListener("mousedown", Mousedown, false);
    GetNewViewport(2).div.addEventListener("mouseup", Mouseup, false);
    ///GetNewViewport(2).div.addEventListener("touchstart", TouchstartF, false);
    ///GetNewViewport(2).div.addEventListener("touchmove", TouchmoveF, false);
    //GetNewViewport(2).div.addEventListener("touchend", TouchendF, false);
    GetNewViewport(2).div.addEventListener("wheel", Wheel, false);
    drawBorderMPR(this);
}

getByid("ImgMPR").onclick = function (catchError) {
    if (this.enable == false) return;
    openMPR = !openMPR;
    if (catchError == "error") openMPR = false;
    img2darkByClass("MPR", !openMPR);
    initMPR();
}

function Anatomical_Section2(nextInstanceNumber) {
    var viewport = GetViewport(), canvas = viewport.canvas();
    if (openMPR == false) return;
    cancelTools();

    var NewCanvas;
    if (!getByid("MprCanvas2")) {
        NewCanvas = document.createElement("CANVAS");
        NewCanvas.id = "MprCanvas2";
    } else {
        NewCanvas = getByid("MprCanvas2");
    }

    var VrDistance = 0;
    VrDistance += getByid("3DDiv" + (o3DListLength - 1)).thickness - Thickness - (getByid("3DDiv" + 0).thickness - Thickness);
    VrDistance /= o3DListLength;
    if (VrDistance == 0) VrDistance = 1;
    if (VrDistance < 0) VrDistance *= -1;
    NewCanvas.style = "position: absolute;top: 50%;left:50%; margin: -" +
        (o3DListLength * (parseInt(canvas.style.height) / parseFloat(GetNewViewport().height)) * VrDistance / 2) +
        "px 0 0 -" + (parseInt(canvas.style.width) / 2) + "px;transform:scaleY(" + (-1 * Direction_VR) + ");";
    GetViewport(1).appendChild(NewCanvas);
    try {
        GetViewport(1).canvas().style.display = "none";
        GetViewportMark(1).style.display = "none";
    } catch (ex) { };

    var o3Dcanvas = getByid("3DDiv" + 0).canvas();
    NewCanvas.height = o3DListLength;
    NewCanvas.width = o3Dcanvas.width;

    //NewCanvas.style.imageRendering = "-moz-crisp-edges";
    NewCanvas.style.height = (NewCanvas.height * (parseInt(canvas.style.height) / parseFloat(GetNewViewport().height)) * VrDistance) + "px"; // + "px";
    NewCanvas.style.width = canvas.style.width;
    var imgData2 = NewCanvas.getContext("2d").getImageData(0, 0, NewCanvas.width, NewCanvas.height);
    var PointY = parseInt(o3DPointY);
    var PointX = parseInt(o3DPointX);
    var buffer_mpr_Y_t = buffer_mpr_Y;
    var PointY_t = PointY;
    if (nextInstanceNumber >= 0) nowInstanceNumber = nextInstanceNumber;
    else nowInstanceNumber = GetViewport().InstanceNumber;

    if (getByid("mprLight").checked == true) {
        for (var l = 0; l < o3DListLength; l++) {
            var canvas1 = getByid("3DDiv" + l).canvas();
            var ctxData0 = canvas1.getContext("2d").createImageData(NewCanvas.width, 1);
            var ctxData = canvas1.getContext("2d").createImageData(NewCanvas.width, 1);

            for (var dataH = l; dataH == l; dataH += 1) {
                for (var dataW = 0; dataW < NewCanvas.width * 4; dataW += 4) {
                    ctxData0.data[dataW] = Uint8Canvas[l][(buffer_mpr_Y_t) * o3Dcanvas.width * 4 + dataW + 0];
                    ctxData0.data[dataW + 1] = Uint8Canvas[l][(buffer_mpr_Y_t) * o3Dcanvas.width * 4 + dataW + 1];
                    ctxData0.data[dataW + 2] = Uint8Canvas[l][(buffer_mpr_Y_t) * o3Dcanvas.width * 4 + dataW + 2];
                    ctxData0.data[dataW + 3] = Uint8Canvas[l][(buffer_mpr_Y_t) * o3Dcanvas.width * 4 + dataW + 3];
                    ctxData.data[dataW] = 221;
                    ctxData.data[dataW + 1] = 53;
                    ctxData.data[dataW + 2] = 119;
                    ctxData.data[dataW + 3] = 255;
                }
            }
            canvas1.getContext("2d").putImageData(ctxData0, 0, buffer_mpr_Y_t);
            canvas1.getContext("2d").putImageData(ctxData, 0, PointY_t);
        }
        buffer_mpr_Y = PointY;
    }
    // var SeriesCount = getSeriesAmount();
    for (var l = 0; l < o3DListLength; l++) {
        for (var dataH = l; dataH == l; dataH += 1) {
            for (var dataW = 0; dataW < NewCanvas.width * 4; dataW += 4) {
                if (dataW == PointX * 4) {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = 38;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = 140;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = 191;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                } else if (dataH == parseInt(nowInstanceNumber * (o3DListLength / SeriesCount)) + 0) {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = 255;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = 255;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = 0;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                } else {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = Uint8Canvas[l][(PointY) * o3Dcanvas.width * 4 + dataW + 0];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = Uint8Canvas[l][(PointY) * o3Dcanvas.width * 4 + dataW + 1];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = Uint8Canvas[l][(PointY) * o3Dcanvas.width * 4 + dataW + 2];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                }
            }
        }
    }
    NewCanvas.getContext("2d").putImageData(imgData2, 0, 0);
}

function Anatomical_Section(nextInstanceNumber) {
    var viewport = GetViewport(), canvas = viewport.canvas();
    if (openMPR == false) return;
    cancelTools();
    var NewCanvas;
    if (!getByid("MprCanvas1")) {
        NewCanvas = document.createElement("CANVAS");
        NewCanvas.id = "MprCanvas1";
    } else {
        NewCanvas = getByid("MprCanvas1");
    }

    var VrDistance = 0;
    VrDistance += getByid("3DDiv" + (o3DListLength - 1)).thickness - Thickness - (getByid("3DDiv" + 0).thickness - Thickness);
    VrDistance /= o3DListLength;

    if (VrDistance < 0) VrDistance *= -1;
    if (VrDistance == 0) VrDistance = 1;
    NewCanvas.style = "position: absolute;top: 50%;left:50%; margin: -" + (parseInt(canvas.style.height) / 2) +
        "px 0 0 -" + (o3DListLength * (parseInt(canvas.style.height) / parseFloat(GetNewViewport().height)) * VrDistance / 2) + "px;" +
        "transform:rotate(" + (-90) + "deg) scaleY(" + (1) + ") scaleX(" + (Direction_VR) + ");";

    GetViewport(0).appendChild(NewCanvas);
    try {
        GetViewport(0).canvas().style.display = "none";
        GetViewportMark(0).style.display = "none";
    } catch (ex) { };

    var o3Dcanvas = getByid("3DDiv" + 0).canvas();
    //NewCanvas.style.imageRendering = "-moz-crisp-edges";
    NewCanvas.height = o3Dcanvas.height;
    NewCanvas.width = o3DListLength;
    NewCanvas.style.height = canvas.style.height;

    NewCanvas.style.width = (NewCanvas.width * (parseInt(canvas.style.height) / parseFloat(GetNewViewport().height)) * VrDistance) + "px";


    var imgData2 = NewCanvas.getContext("2d").getImageData(0, 0, NewCanvas.width, NewCanvas.height);
    var PointX = parseInt(o3DPointX);
    var PointY = parseInt(o3DPointY);
    var buffer_mpr_X_t = buffer_mpr_X;
    var PointX_t = PointX;
    if (nextInstanceNumber >= 0) nowInstanceNumber = nextInstanceNumber;
    else nowInstanceNumber = GetViewport().InstanceNumber;
    if (getByid("mprLight").checked == true) {
        for (var l = 0; l < o3DListLength; l++) {
            var canvas1 = getByid("3DDiv" + l).canvas();
            var ctxData0 = canvas1.getContext("2d").createImageData(1, NewCanvas.height);
            var ctxData = canvas1.getContext("2d").createImageData(1, NewCanvas.height);
            for (var dataH = 0; dataH < NewCanvas.height; dataH += 1) {
                for (var dataW = l * 4; dataW == l * 4; dataW += 4) {
                    ctxData0.data[dataH * 4] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (buffer_mpr_X_t) * 4];
                    ctxData0.data[dataH * 4 + 1] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (buffer_mpr_X_t) * 4 + 1];
                    ctxData0.data[dataH * 4 + 2] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (buffer_mpr_X_t) * 4 + 2];
                    ctxData0.data[dataH * 4 + 3] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (buffer_mpr_X_t) * 4 + 3];
                    ctxData.data[dataH * 4] = 38;
                    ctxData.data[dataH * 4 + 1] = 140;
                    ctxData.data[dataH * 4 + 2] = 191;
                    ctxData.data[dataH * 4 + 3] = 255;
                }
            }
            canvas1.getContext("2d").putImageData(ctxData0, buffer_mpr_X_t, 0);
            canvas1.getContext("2d").putImageData(ctxData, PointX_t, 0);
        }
        buffer_mpr_X = PointX;
    }
    for (var l = 0; l < o3DListLength; l++) {
        for (var dataH = 0; dataH < NewCanvas.height; dataH += 1) {
            for (var dataW = l * 4; dataW == l * 4; dataW += 4) {
                if (dataH == PointY) {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = 221;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = 53;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = 119;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                } else if (l == parseInt(nowInstanceNumber * (o3DListLength / SeriesCount)) + 0) {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = 255;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = 255;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = 0;
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                } else {
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (PointX) * 4];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 1] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (PointX) * 4 + 1];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 2] = Uint8Canvas[l][dataH * o3Dcanvas.width * 4 + (PointX) * 4 + 2];
                    imgData2.data[dataH * NewCanvas.width * 4 + dataW + 3] = 255;
                }
            }
        }
    }
    NewCanvas.getContext("2d").putImageData(imgData2, 0, 0);
}

function initMPR() {
    if (openMPR == false) {
        exitMPR_UI();
        VIEWPORT.fixRow = VIEWPORT.fixCol = null;
        for (var ll = 0; ll < o3DListLength; ll++) {
            try {
                var elem = getByid("3DDiv" + ll);
                elem.canvas().width = 2;
                elem.canvas().height = 2;
                elem.getElementsByClassName("VrCanvas")[0] = null;
                delete elem.canvas();
                elem.parentElement.removeChild(elem);
                delete elem;
            } catch (ex) { }
        }
        for (var ll = 0; ll < o3d_3degree; ll++) {
            try {
                var elem = getByid("3DDiv2_" + ll);
                elem.canvas().width = 2;
                elem.canvas().height = 2;
                elem.getElementsByClassName("VrCanvas")[0] = null;
                delete elem;
                elem = getByid("3DDiv3_" + ll);
                elem.canvas().width = 2;
                elem.canvas().height = 2;
                elem.getElementsByClassName("VrCanvas")[0] = null;
                delete elem;
            } catch (ex) { }
        }
        //VIEWPORT.lockViewportList = [];
        ViewPortList[0].lockRender = ViewPortList[1].lockRender = ViewPortList[3].lockRender = false;
        window.removeEventListener("resize", resizeVR, false);
        GetNewViewport(3).div.removeEventListener("mousemove", mousemove3D, false);
        GetNewViewport(3).div.removeEventListener("mousedown", mousedown3D, false);
        GetNewViewport(3).div.removeEventListener("mouseup", mouseup3D, false);
        GetNewViewport(3).div.removeEventListener("touchstart", touchstart3D, false);
        GetNewViewport(3).div.removeEventListener("touchmove", touchmove3D, false);
        GetNewViewport(3).div.removeEventListener("touchend", touchend3D, false);
        GetNewViewport(0).div.removeEventListener("mousemove", Anatomical_SectionMouseMove0, false);
        GetNewViewport(0).div.removeEventListener("mousedown", Anatomical_SectionMouseDown0, false);
        GetNewViewport(0).div.removeEventListener("mouseup", Anatomical_SectionMouseMouseup0, false);
        GetNewViewport(0).div.removeEventListener("wheel", Wheel, false);
        GetNewViewport(1).div.removeEventListener("mousemove", Anatomical_SectionMouseMove, false);
        GetNewViewport(1).div.removeEventListener("mousedown", Anatomical_SectionMouseDown, false);
        GetNewViewport(1).div.removeEventListener("mouseup", Anatomical_SectionMouseMouseup, false);
        GetNewViewport(1).div.removeEventListener("wheel", Wheel, false);
        cancelTools();
        openMouseTool = true;
        drawBorder(getByid("MouseOperation"));
        getByid("ImgMPR").src = "../image/icon/black/b_AdvancedMode_off.png";
        getByid("3dDisplay").style.display = "none";
        getByid("mprLightLabel").style.display = "none";
        try {
            getByid("MprCanvas1").style.display = "none";
            getByid("MprCanvas2").style.display = "none";
        } catch (ex) { }
        if (getByid("OutSide3dDiv")) {
            delete getByid("OutSide3dDiv");
            getByid("OutSide3dDiv").parentElement.removeChild(getByid("OutSide3dDiv"));
        }
        for (var i = 0; i < Viewport_Total; i++) {
            GetNewViewport(i).div.removeEventListener("contextmenu", contextmenuF, false);
            GetNewViewport(i).div.removeEventListener("mousemove", Mousemove, false);
            GetNewViewport(i).div.removeEventListener("mousedown", Mousedown, false);
            GetNewViewport(i).div.removeEventListener("mouseup", Mouseup, false);
            GetNewViewport(i).div.removeEventListener("mouseout", Mouseout, false);
            GetNewViewport(i).div.removeEventListener("wheel", Wheel, false);
            GetNewViewport(i).div.removeEventListener("mousedown", thisF, false);
            GetNewViewport(i).div.removeEventListener("touchstart", touchstartF, false);
            GetNewViewport(i).div.removeEventListener("touchend", touchendF, false);
            GetNewViewport(i).div.addEventListener("touchstart", thisF, false);
            GetNewViewport(i).div.addEventListener("mousedown", thisF, false);

        }
        viewportNumber = 0;
        window.onresize();
        //SetTable();
        o3DListLength = 0;
        //set_BL_model('MouseTool');
        //mouseTool();
        if (GetViewport(0).sop)
            loadAndViewImage(Patient.findSop(GetViewport(0).sop).imageId, 0);
        //canvas = GetNewViewport().canvas
        getByid("MouseOperation").click();
    } else if (openMPR == true) {
        enterMPR_UI();
        VIEWPORT.fixRow = VIEWPORT.fixCol = 2;
        openLink = false;
        changeLinkImg();
        openAnnotation = false;
        displayAnnotation();
        getByid("3dDisplay").style.display = "";
        getByid("mprLightLabel").style.display = "";
        getByid("SplitViewportDiv").style.display = "none";
        cancelTools();
        getByid("ImgMPR").src = "../image/icon/black/b_AdvancedMode_on.png";
        var sop = GetNewViewport().sop;
        SetTable(2, 2);//如果MPR模式正在開啟，固定2x2
        //NowResize = true;
        GetViewport().NowCanvasSizeWidth = GetViewport().NowCanvasSizeHeight = null;
        for (var c = 0; c < 4; c++)
            GetViewport(c).canvas().style.display = GetViewportMark(c).style.display = "none";
        viewportNumber = 2;
        loadAndViewImage(Patient.findSop(GetNewViewport().sop).imageId);
        //VIEWPORT.lockViewportList = [0, 1, 3];
        ViewPortList[0].lockRender = ViewPortList[1].lockRender = ViewPortList[3].lockRender = true;

        window.addEventListener("resize", resizeVR, false);
        for (var i1 = 0; i1 < Viewport_Total; i1++) {
            GetNewViewport(i1).div.removeEventListener("contextmenu", contextmenuF, false);
            GetNewViewport(i1).div.removeEventListener("mousemove", Mousemove, false);
            GetNewViewport(i1).div.removeEventListener("mousedown", Mousedown, false);
            GetNewViewport(i1).div.removeEventListener("mouseup", Mouseup, false);
            GetNewViewport(i1).div.removeEventListener("mouseout", Mouseout, false);
            GetNewViewport(i1).div.removeEventListener("wheel", Wheel, false);
            GetNewViewport(i1).div.removeEventListener("mousedown", thisF, false);
            GetNewViewport(i1).div.removeEventListener("touchstart", touchstartF, false);
            GetNewViewport(i1).div.removeEventListener("touchend", touchendF, false);
            GetNewViewport(i1).div.removeEventListener("touchstart", thisF, false);
            //GetNewViewport(i1).div.removeEventListener("mousedown", thisF, false);
            //GetNewViewport(i).div.addEventListener("wheel", wheelF, false);
        }
        //GetNewViewport().div.removeEventListener("touchstart", thisF, false);
        //GetNewViewport().div.removeEventListener("mousedown", thisF, false);
        GetNewViewport().div.addEventListener("contextmenu", contextmenuF, false);
        GetNewViewport().div.addEventListener("mouseout", Mouseout, false);
        GetNewViewport().div.addEventListener("touchstart", touchstartF, false);
        GetNewViewport().div.addEventListener("touchmove", touchmoveF, false);
        GetNewViewport().div.addEventListener("touchend", touchendF, false);
        GetNewViewport().div.addEventListener("wheel", Wheel, false);
        GetNewViewport(3).div.addEventListener("mousemove", mousemove3D, false);
        GetNewViewport(3).div.addEventListener("mousedown", mousedown3D, false);
        GetNewViewport(3).div.addEventListener("mouseup", mouseup3D, false);
        GetNewViewport(3).div.addEventListener("touchstart", touchstart3D, false);
        GetNewViewport(3).div.addEventListener("touchmove", touchmove3D, false);
        GetNewViewport(3).div.addEventListener("touchend", touchend3D, false);
        GetNewViewport(3).div.addEventListener("contextmenu", contextmenuF, false);

        GetNewViewport(0).div.addEventListener("mousemove", Anatomical_SectionMouseMove0, false);
        GetNewViewport(0).div.addEventListener("mousedown", Anatomical_SectionMouseDown0, false);
        GetNewViewport(0).div.addEventListener("mouseup", Anatomical_SectionMouseMouseup0, false);
        GetNewViewport(0).div.addEventListener("wheel", Wheel, false);
        GetNewViewport(1).div.addEventListener("mousemove", Anatomical_SectionMouseMove, false);
        GetNewViewport(1).div.addEventListener("mousedown", Anatomical_SectionMouseDown, false);
        GetNewViewport(1).div.addEventListener("mouseup", Anatomical_SectionMouseMouseup, false);
        GetNewViewport(1).div.addEventListener("wheel", Wheel, false);

        for (var ll = 0; ll < o3DListLength; ll++) {
            var elem = getByid("3DDiv" + ll);
            GetViewport(3).appendChild(elem);
        }
        var list = sortInstance(sop);
        //var WandH = getFixSize(window.innerWidth, window.innerHeight, GetViewport(0));
        var WandH = getViewportFixSize(window.innerWidth, window.innerHeight, 2, 2);
        if (o3DListLength != list.length) {
            for (var ll = 0; ll < o3DListLength; ll++) {
                try {
                    var elem = getByid("3DDiv" + ll);
                    elem.canvas().width = 2;
                    elem.canvas().height = 2;
                    elem.getElementsByClassName("VrCanvas")[0] = null;
                    delete elem.canvas();
                    elem.parentElement.removeChild(elem);
                    delete elem;
                } catch (ex) { }
            }
        }
        if (o3d_3degree >= 0) {
            for (var ll = 0; ll < o3d_3degree; ll++) {
                try {
                    var elem = getByid("3DDiv2_" + ll);
                    elem.canvas().width = 2;
                    elem.canvas().height = 2;
                    elem.getElementsByClassName("VrCanvas")[0] = null;
                    delete elem.canvas();
                    elem.parentElement.removeChild(elem);
                    delete elem;
                } catch (ex) { }
            }
            for (var ll = 0; ll < o3d_3degree; ll++) {
                try {
                    var elem = getByid("3DDiv3_" + ll);
                    elem.canvas().width = 2;
                    elem.canvas().height = 2;
                    elem.getElementsByClassName("VrCanvas")[0] = null;
                    delete elem.canvas();
                    elem.parentElement.removeChild(elem);
                    delete elem;
                } catch (ex) { }
            }
        }

        o3DListLength = list.length;
        Thickness = 0;
        var big = 100000000000000000000000000000;
        var OutSide3dDiv = document.createElement("DIV");
        OutSide3dDiv.id = "OutSide3dDiv";

        var checkRender = 0;
        openRendering = true;
        img2darkByClass("Rendering", !openRendering);

        function sleep(time) {
            return new Promise((resolve) => setTimeout(resolve, time));
        }
        var catchError = false;
        function onImageRendered() {
            if (catchError == true && openMPR == true) {
                openRendering = false;
                img2darkByClass("MPR", !openMPR);
                getByid("ImgMPR").click();
                return;
            }

            sleep(100).then(() => {
                Direction_VR = 1;
                if ((getByid("3DDiv" + (o3DListLength - 1)).thickness - Thickness) - (getByid("3DDiv" + 0).thickness - Thickness) < 0) {
                    Direction_VR = -1;
                    var thicknessList = [];
                    for (var ll = 0; ll < o3DListLength; ll++) {
                        var div1 = getByid("3DDiv" + ll);
                        thicknessList.push(div1.thickness);
                    }
                    for (var ll = 0; ll < o3DListLength; ll++) {
                        var div1 = getByid("3DDiv" + ll);
                        div1.thickness = thicknessList[o3DListLength - ll - 1];
                    }
                }
                Alpha3D();
                sleep(100).then(() => {
                    openRendering = false;
                    img2darkByClass("MPR", !openMPR);
                    setTimeout(getByid("MouseOperation_MPR").click(), 100);
                })
            })
        }


        function displayCanvasFor3D(DicomCanvas, image, pixelData) {
            DicomCanvas.width = image.width;
            DicomCanvas.height = image.height
            DicomCanvas.style.width = image.width + "px";
            DicomCanvas.style.height = image.height + "px";
            var ctx2 = DicomCanvas.getContext("2d");
            var imgData2 = ctx2.createImageData(image.width, image.height);
            var windowWidth = image.windowWidth;
            var windowCenter = image.windowCenter;
            if (getByid("o3DAngio").selected == true) {
                windowWidth = 332;
                windowCenter = 287;
            } else if (getByid("o3DAirways").selected == true) {
                //如果是肺氣管模型，使用對應的Window Level
                windowWidth = 409;
                windowCenter = -538;
            }
            var high = windowCenter + (windowWidth / 2);
            var low = windowCenter - (windowWidth / 2);
            var intercept = image.intercept;
            if (CheckNull(intercept)) intercept = 0;
            var slope = image.slope;
            if (CheckNull(slope)) slope = 1;

            var _firstNumber = 0;
            if (image.color == true) {
                for (var i = 0; i < imgData2.data.length; i += 4) {
                    _firstNumber = pixelData[i];
                    _firstNumber = parseInt(((_firstNumber * slope - low + intercept) / (high - low)) * 255);
                    imgData2.data[i + 0] = _firstNumber;
                    _firstNumber = pixelData[i + 1];
                    _firstNumber = parseInt(((_firstNumber * slope - low + intercept) / (high - low)) * 255);
                    imgData2.data[i + 1] = _firstNumber;
                    _firstNumber = pixelData[i + 2];
                    _firstNumber = parseInt(((_firstNumber * slope - low + intercept) / (high - low)) * 255);
                    imgData2.data[i + 2] = _firstNumber;
                    imgData2.data[i + 3] = 255;
                }
            }
            else if ((image.invert != true && GetNewViewport().invert == true) || (image.invert == true && GetNewViewport().invert == false)) {
                for (var i = 0, j = 0; i < imgData2.data.length; i += 4, j++) {
                    imgData2.data[i + 0] = imgData2.data[i + 1] = imgData2.data[i + 2] = 255 - parseInt(((pixelData[j] * slope - low + intercept) / (high - low)) * 255)
                    imgData2.data[i + 3] = 255;
                }
            }
            else {
                for (var i = 0, j = 0; i < imgData2.data.length; i += 4, j++) {
                    imgData2.data[i + 0] = imgData2.data[i + 1] = imgData2.data[i + 2] = parseInt(((pixelData[j] * slope - low + intercept) / (high - low)) * 255);
                    imgData2.data[i + 3] = 255;
                }
            }
            ctx2.putImageData(imgData2, 0, 0);
        }
        GetViewport(3).appendChild(OutSide3dDiv);
        getByid("OutSide3dDiv").parentNode.replaceChild(OutSide3dDiv, getByid("OutSide3dDiv"));
        getByid("OutSide3dDiv").style.transformStyle = "";
        /*if (getByid("3dStrengthenAuto").selected == true || getByid("3dStrengthenAlways").selected|| getByid("o3DMinIP").selected) {
            if (getByid("OutSide3dDiv")) getByid("OutSide3dDiv").style.transformStyle = "preserve-3d";
        } else {
            if (getByid("OutSide3dDiv")) getByid("OutSide3dDiv").style.transformStyle = "";
        }*/

        Thickness = -Thickness + big;

        for (var l = 0; l < list.length; l++) {
            const l2 = l;
            const image = getPatientbyImageID[list[l2].imageId].image;
            const pixelData = getPatientbyImageID[list[l2].imageId].pixelData;
            try {
                var NewDiv = document.createElement("DIV");
                NewDiv.addEventListener("contextmenu", contextmenuF, false);
                //NewDiv.addEventListener('cornerstoneimagerendered', onImageRendered);
                NewDiv.id = "3DDiv" + l2;
                NewDiv.className = "o3DDiv";
                NewDiv.sop = image.data.string('x00080018');
                NewDiv.width = image.width;
                NewDiv.height = image.height;
                NewDiv.style.width = image.width + "px";
                NewDiv.style.height = image.height + "px";
                NewDiv.thickness = parseFloat(image.data.string('x00200032').split("\\")[2]) * GetNewViewport().transform.PixelSpacingX;
                if (NewDiv.thickness < Thickness) Thickness = NewDiv.thickness;
                if (NewDiv.thickness < big) big = NewDiv.thickness;

                o3Dcount = list.length;
                OutSide3dDiv.appendChild(NewDiv);
                getByid("3DDiv" + l2).parentNode.replaceChild(NewDiv, getByid("3DDiv" + l2));
                NewDiv.style.zIndex = l2;

                var NewCanvas = document.createElement("CANVAS");
                NewCanvas.className = "VrCanvas";
                NewDiv.appendChild(NewCanvas);
                displayCanvasFor3D(NewCanvas, image, pixelData);
                //showTheImage(NewDiv, image, '3d', null, null);
                NewDiv.style.transform = "rotate3d(0, 0, 0 , 0deg) translateZ(-" + l2 + "px)";
                NewDiv.style.width = WandH[0] + "px";
                NewDiv.style.height = WandH[1] + "px";
                //NewDiv.style = "transform:rotate3d(0, 0, 0 , 0deg) translateZ(-" + l2 + "px);;position:absolute;width:" + WandH[0] + "px;height:" + WandH[1] + "px;"; //z-index:" + l2 + ";";
                NewDiv.canvas = function () {
                    if (this.getElementsByClassName("VrCanvas")[0])
                        return this.getElementsByClassName("VrCanvas")[0];
                    else
                        return null;
                }
                NewDiv.ctx = function () {
                    if (this.getElementsByClassName("VrCanvas")[0])
                        return this.getElementsByClassName("VrCanvas")[0].getContext("2d");
                    else
                        return null;
                }
            } catch (ex) {
                catchError = true;
                if (openMPR == true) {
                    openMPR = false;
                    alert("Error, this image may not support 3D.");
                };
                openRendering = false;
                getByid("ImgMPR").click('error');
                return;
            };

        }
        onImageRendered();
        return;
    }
}

function display3DLine(x0, y0, x1, y1, color) {
    if (!color) color = "#00FF00";
    if (!openMPR) return;

    var MarkCanvas = GetViewportMark();
    var tempctx = MarkCanvas.getContext("2d");

    var lineWid = parseFloat(MarkCanvas.width) / parseFloat(Css(MarkCanvas, 'width'));
    var sizeCheck = false;
    if (sizeCheck == true && lineWid <= 0) {
        lineWid = parseFloat(Css(MarkCanvas, 'width')) / parseFloat(MarkCanvas.width);
        if (lineWid <= 1.5) lineWid = 1.5;
        lineWid *= Math.abs(parseFloat(MarkCanvas.width) / parseFloat(Css(MarkCanvas, 'width')));
    } else if (sizeCheck == true) {
        lineWid *= Math.abs(parseFloat(Css(MarkCanvas, 'width')) / parseFloat(MarkCanvas.width));
    } else if (lineWid <= 0) {
        lineWid = parseFloat(Css(MarkCanvas, 'width')) / parseFloat(MarkCanvas.width);
    }
    if (lineWid <= 1.5) lineWid = 1.5;
    tempctx.lineWidth = "" + ((Math.abs(lineWid)) * 1);
    nowInstanceNumber = GetViewport().InstanceNumber;

    tempctx.beginPath();
    tempctx.strokeStyle = color;
    tempctx.fillStyle = color;

    tempctx.moveTo(x0, y0);
    tempctx.lineTo(x1, y1);
    tempctx.stroke();
    if (openAngle == 2) {
        tempctx.moveTo(x0, y0);
        tempctx.lineTo(x2, y2);
        tempctx.stroke();
    }
    tempctx.closePath();
}

function o3dWindowLevel() {
    var sop = GetNewViewport().sop;
    if (o3Dcount != o3DListLength) {
        for (var ll = o3DListLength - 1; ll >= o3Dcount; ll--) {
            var elem = getByid("3DDiv" + ll);
            elem.canvas().width = 2;
            elem.canvas().height = 2;
            elem.parentElement.removeChild(elem);
        }
    }
    o3DListLength = o3Dcount;
    for (var ll = 0; ll < o3DListLength; ll++) {
        try {
            var elem = getByid("3DDiv" + ll);
            elem.canvas().width = 2;
            elem.canvas().height = 2;
        } catch (ex) { }
    }
    if (o3d_3degree >= 0) {
        for (var ll = 0; ll < o3d_3degree; ll++) {
            var elem = getByid("3DDiv2_" + ll);
            elem.canvas().width = 2;
            elem.canvas().height = 2;
            elem.getElementsByClassName("VrCanvas")[0] = null;
            delete elem.canvas();
            elem.parentElement.removeChild(elem);
            delete elem;
        }
        for (var ll = 0; ll < o3d_3degree; ll++) {
            var elem = getByid("3DDiv3_" + ll);
            elem.canvas().width = 2;
            elem.canvas().height = 2;
            elem.getElementsByClassName("VrCanvas")[0] = null;
            delete elem.canvas();
            elem.parentElement.removeChild(elem);
            delete elem;
        }
    }
    var list = sortInstance(sop);
    var WandH;
    if (openVR) WandH = getViewportFixSize(window.innerWidth, window.innerHeight, 1, 1);
    else if (openMPR) WandH = getViewportFixSize(window.innerWidth, window.innerHeight, 2, 2);

    o3DListLength = list.length;
    var big = 10000000000000000000000000000;
    Thickness = 0;

    var checkRender = 0;
    openRendering = true;
    img2darkByClass("Rendering", !openRendering);

    function sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    function onImageRendered() {
        Direction_VR = 1;
        sleep(100).then(() => {
            if ((getByid("3DDiv" + (o3DListLength - 1)).thickness - Thickness) - (getByid("3DDiv" + 0).thickness - Thickness) < 0) {
                var thicknessList = [];
                Direction_VR = -1;
                for (var ll = 0; ll < o3DListLength; ll++) {
                    var div1 = getByid("3DDiv" + ll);
                    thicknessList.push(div1.thickness);
                }
                for (var ll = 0; ll < o3DListLength; ll++) {
                    var div1 = getByid("3DDiv" + ll);
                    div1.thickness = thicknessList[o3DListLength - ll - 1];
                }
            }
            Alpha3D();
            sleep(100).then(() => {
                openRendering = false;
                if (openMPR) img2darkByClass("MPR", !openMPR);
                else if (openVR) img2darkByClass("VR", !openVR);
            })
        })

    }

    Thickness = 0;
    var big = 10000000000000000000;
    Thickness = -Thickness + big;
    for (var l = 0; l < list.length; l++) {
        const l2 = l;
        const image = getPatientbyImageID[list[l2].imageId].image;
        const pixelData = getPatientbyImageID[list[l2].imageId].pixelData;
        var NewDiv = document.createElement("DIV");
        NewDiv.addEventListener("contextmenu", contextmenuF, false);
        // NewDiv.addEventListener('cornerstoneimagerendered', onImageRendered);
        NewDiv.id = "3DDiv" + l2;
        NewDiv.className = "o3DDiv";
        NewDiv.sop = image.data.string('x00080018');
        NewDiv.thickness = parseFloat(image.data.string('x00200032').split("\\")[2]) * GetNewViewport().transform.PixelSpacingX;
        if (NewDiv.thickness < Thickness) Thickness = NewDiv.thickness;
        if (NewDiv.thickness < big) big = NewDiv.thickness;
        NewDiv.width = image.width;
        NewDiv.height = image.height;
        NewDiv.style.width = image.width + "px";
        NewDiv.style.height = image.height + "px";
        NewDiv.style.zIndex = l2;
        //NewDiv.style = "position:absolute;width:" + image.width + "px;height:" + image.height + "px;z-index:" + l2 + ";";
        o3Dcount = list.length;
        if (openVR == true) GetViewport(0).appendChild(NewDiv);
        else if (openMPR == true) GetViewport(3).appendChild(NewDiv);
        getByid("3DDiv" + l2).parentNode.replaceChild(NewDiv, getByid("3DDiv" + l2));

        var NewCanvas = document.createElement("CANVAS");
        NewCanvas.className = "VrCanvas";
        NewDiv.appendChild(NewCanvas);
        displayCanvasFor3D(NewCanvas, image, pixelData);
        //showTheImage(NewDiv, image, '3d', null, null);
        NewDiv.style.transform = "rotate3d(0, 0, 0 , 0deg) translateZ(-" + l2 + "px)";
        NewDiv.style.width = WandH[0] + "px";
        NewDiv.style.height = WandH[1] + "px";
        //NewDiv.style = "transform:rotate3d(0, 0, 0 , 0deg) translateZ(-" + l2 + "px);;position:absolute;width:" + WandH[0] + "px;height:" + WandH[1] + "px;"; //z-index:" + l2 + ";";

        NewDiv.canvas = function () {
            if (this.getElementsByClassName("VrCanvas")[0])
                return this.getElementsByClassName("VrCanvas")[0];
            else
                return null;
        }
        NewDiv.ctx = function () {
            if (this.getElementsByClassName("VrCanvas")[0])
                return this.getElementsByClassName("VrCanvas")[0].getContext("2d");
            else
                return null;
        }
    }
    onImageRendered();
    return;
}

Anatomical_SectionMouseDown0 = function (e) {
    if (e.which == 1) MouseDownCheck = true;
    else if (e.which == 3) rightMouseDown = true;
    windowMouseX = GetmouseX(e);
    windowMouseY = GetmouseY(e);
    GetViewport().originalPointX = getCurrPoint(e)[0];
    GetViewport().originalPointY = getCurrPoint(e)[1];
};

Anatomical_SectionMouseMouseup = function (e) {
    var currX = getCurrPoint(e)[0];
    var currY = getCurrPoint(e)[1];
    MouseDownCheck = false;
    rightMouseDown = false;
}
Anatomical_SectionMouseMove = function (e) {
    if (openMPR == true && openWindow != true && openChangeFile != true) {
        if (MouseDownCheck == true) {
            // viewportNumber = 0;
            let angle2point = rotateCalculation(e);
            currX11M = angle2point[0];
            currY11M = angle2point[1];
            o3DPointX = currX11M;
            o3DPointY = currY11M;
            AngleXY0 = [currX11M, 0];
            AngleXY1 = [currX11M, GetNewViewport(1).height];
            if (openMPR == true) {
                var sop = GetNewViewport().sop;
                var index = SearchUid2Index(sop);
                var i = index[0],
                    j = index[1],
                    k = index[2];
                var Onum = parseInt(Patient.Study[i].Series[j].Sop[k].InstanceNumber);
                Anatomical_Section(Onum, true);
                // Anatomical_Section2(1);
            }
            //console.log(currX11M, currY11M);
            display3DLine(currX11M, 0, currX11M, GetNewViewport().height, "rgb(38,140,191)");
            //  display3DLine(0, currY11M, GetViewport(0).imageWidth, currY11M, "rgb(221,53,119)");
        }
    }
}
Anatomical_SectionMouseDown = function (e) {
    if (e.which == 1) MouseDownCheck = true;
    else if (e.which == 3) rightMouseDown = true;
    windowMouseX = GetmouseX(e);
    windowMouseY = GetmouseY(e);
    GetViewport().originalPointX = getCurrPoint(e)[0];
    GetViewport().originalPointY = getCurrPoint(e)[1];
};

Anatomical_SectionMouseMouseup0 = function (e) {
    var currX = getCurrPoint(e)[0];
    var currY = getCurrPoint(e)[1];
    MouseDownCheck = false;
    rightMouseDown = false;
}
Anatomical_SectionMouseMove0 = function (e) {
    if (openMPR == true && openWindow != true && openChangeFile != true) {
        if (MouseDownCheck == true) {
            // viewportNumber = 0;
            let angle2point = rotateCalculation(e);
            currX11M = angle2point[1];
            currY11M = angle2point[0];
            o3DPointX = currX11M;
            o3DPointY = currY11M;
            AngleXY1 = [currX11M, 0];
            AngleXY0 = [currX11M, GetNewViewport(0).height];
            if (openMPR == true) {
                var sop = GetNewViewport().sop;
                var index = SearchUid2Index(sop);
                var i = index[0],
                    j = index[1],
                    k = index[2];
                var Onum = parseInt(Patient.Study[i].Series[j].Sop[k].InstanceNumber);
                // Anatomical_Section(1);
                Anatomical_Section2(Onum);
            }
            //console.log(currX11M, currY11M);
            //  display3DLine(currX11M, 0, currX11M, GetNewViewport(0).height, "rgb(38,140,191)");
            display3DLine(0, currY11M, GetNewViewport().width, currY11M, "rgb(221,53,119)");
        }
    }
}