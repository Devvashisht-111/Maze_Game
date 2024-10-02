/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web-bundle.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/generators/backtracking.ts":
/*!****************************************!*\
  !*** ./src/generators/backtracking.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.BacktrackingGenerator = void 0;
const maze_1 = __webpack_require__(/*! ../maze */ "./src/maze.ts");
const point_1 = __webpack_require__(/*! ../point */ "./src/point.ts");
/**
 * Class BacktrackingGenerator
 */
class BacktrackingGenerator extends maze_1.Maze {
    /**
     * Constructor
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    constructor(width, height, distance = 2) {
        super(width, height);
        this.reInit(width, height, distance);
    }
    /**
     * reInit
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    reInit(width, height, distance = 2) {
        super.reInit(width, height);
        if (BacktrackingGenerator.checkFieldSize(width, height)) {
            throw new Error('Field width and height MUST be odd');
        }
        this.field = this.genInitField();
        this.distance = distance;
        this.generate();
    }
    /**
     * genInitField
     * @return {[][]} field
     */
    genInitField() {
        const field = [];
        for (let y = 0; y < this.height; y++) {
            field[y] = [];
            for (let x = 0; x < this.width; x++) {
                if (x % 2 && y % 2) {
                    field[y][x] = maze_1.Maze.MAZE_EMPTY;
                }
                else {
                    field[y][x] = maze_1.Maze.MAZE_WALL;
                }
            }
        }
        return field;
    }
    /**
     * getUnvisitedPointsEx
     * @param {boolean} returnCount
     * @return {Point[]|number}
     */
    getUnvisitedPointsEx(returnCount = true) {
        let count = 0;
        const unvisitedPoints = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const point = new point_1.Point(x, y);
                const type = this.getFieldPointType(point);
                if (type !== maze_1.Maze.MAZE_WALL &&
                    type !== BacktrackingGenerator.MAZE_POINT_VISITED) {
                    count++;
                    unvisitedPoints.push(point);
                }
            }
        }
        return returnCount ? count : unvisitedPoints;
    }
    /**
     * getUnvisitedPointsCount
     * @return {number}
     */
    getUnvisitedPointsCount() {
        return this.getUnvisitedPointsEx();
    }
    /**
     * getUnvisitedPoints
     * @return {Point[]}
     */
    getUnvisitedPoints() {
        return this.getUnvisitedPointsEx(false);
    }
    /**
     * removeWall
     * @param {Point} pointFrom
     * @param {Point} pointTo
     */
    removeWall(pointFrom, pointTo) {
        const xDiff = pointTo.x - pointFrom.x;
        const yDiff = pointTo.y - pointFrom.y;
        const target = new point_1.Point(pointFrom.x + ((xDiff !== 0) ? (xDiff / Math.abs(xDiff)) : 0), pointFrom.y + ((yDiff !== 0) ? (yDiff / Math.abs(yDiff)) : 0));
        this.setFieldPointType(target, BacktrackingGenerator.MAZE_POINT_VISITED);
    }
    /**
     * generate
     */
    generate() {
        let issetEndPoint = false;
        let neighbourPoints = [];
        let currentPoint = this.getStartPoint();
        const pathStack = [];
        pathStack.push(currentPoint);
        this.setFieldPointType(currentPoint, BacktrackingGenerator.MAZE_POINT_VISITED);
        let unvisitedPointsCount = this.getUnvisitedPointsCount();
        while (unvisitedPointsCount > 0) {
            neighbourPoints =
                this.getNeighboursPoints(currentPoint, this.distance, (type) => {
                    return type !== maze_1.Maze.MAZE_WALL &&
                        type !== maze_1.Maze.MAZE_PATH &&
                        type !== maze_1.Maze.MAZE_WAY &&
                        type !== BacktrackingGenerator.MAZE_POINT_VISITED;
                });
            if (neighbourPoints.length !== 0) {
                const randNum = BacktrackingGenerator.randomInt(0, neighbourPoints.length - 1);
                const nextPoint = neighbourPoints[randNum];
                this.removeWall(currentPoint, nextPoint);
                currentPoint = nextPoint;
                pathStack.push(currentPoint);
                this.setFieldPointType(currentPoint, BacktrackingGenerator.MAZE_POINT_VISITED);
                unvisitedPointsCount--;
                if (!issetEndPoint && unvisitedPointsCount === 0) {
                    issetEndPoint = this.setEndPoint(currentPoint);
                }
            }
            else if (pathStack.length > 0) {
                const pathStackPoint = pathStack.pop();
                if (pathStackPoint !== undefined) {
                    currentPoint = pathStackPoint;
                    if (!issetEndPoint) {
                        issetEndPoint = this.setEndPoint(currentPoint);
                    }
                }
            }
            else {
                const unvisitedPoints = this.getUnvisitedPoints();
                const randNum = BacktrackingGenerator.randomInt(0, unvisitedPoints.length - 1);
                currentPoint = unvisitedPoints[randNum];
            }
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const point = new point_1.Point(x, y);
                const type = this.getFieldPointType(point);
                if (type === BacktrackingGenerator.MAZE_POINT_VISITED) {
                    this.setFieldPointType(point, maze_1.Maze.MAZE_PATH);
                }
            }
        }
        const point = new point_1.Point(this.width - 2, this.height - 2);
        if (this.getFieldPointType(point) !== maze_1.Maze.MAZE_PATH) {
            neighbourPoints =
                this.getNeighboursPoints(point, 1, (type) => {
                    return type === maze_1.Maze.MAZE_PATH;
                });
            if (neighbourPoints.length !== 0) {
                const randNum = BacktrackingGenerator.randomInt(0, neighbourPoints.length - 1);
                this.setEndPoint(neighbourPoints[randNum]);
            }
        }
        else {
            this.setEndPoint(point);
        }
    }
    /**
     * randomInteger
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    static randomInt(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    /**
     * checkFieldSize
     * @param {number} width
     * @param {number} height
     * @return {boolean}
     */
    static checkFieldSize(width, height) {
        return (width - 1) % 2 !== 0 || (height - 1) % 2 !== 0;
    }
}
exports.BacktrackingGenerator = BacktrackingGenerator;
BacktrackingGenerator.MAZE_POINT_VISITED = 10;


/***/ }),

/***/ "./src/maze.ts":
/*!*********************!*\
  !*** ./src/maze.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Maze = void 0;
const point_1 = __webpack_require__(/*! ./point */ "./src/point.ts");
/**
 * Class Maze
 */
class Maze {
    /**
     * Constructor
     * @param {number} width
     * @param {number} height
     */
    constructor(width = 0, height = 0) {
        this.reInit(width, height);
    }
    /**
     * reInit
     * @param {number} width
     * @param {number} height
     */
    reInit(width, height) {
        this.width = width;
        this.height = height;
        this.field = this.genEmptyField();
        this.startPoint = new point_1.Point(1, 1);
        this.endPoint = new point_1.Point(1, 1);
        this.currentPoint = new point_1.Point(1, 1);
    }
    /**
     * getWidth
     * @return {Point} width
     */
    getWidth() {
        return this.width;
    }
    /**
     * getHeight
     * @return {Point} width
     */
    getHeight() {
        return this.height;
    }
    /**
     * getField
     * @return {[][]} field
     */
    getField() {
        return this.field;
    }
    /**
     * genEmptyField
     * @return {[][]} field
     */
    genEmptyField() {
        const field = [];
        for (let y = 0; y < this.height; y++) {
            field[y] = [];
            for (let x = 0; x < this.width; x++) {
                field[y][x] = Maze.MAZE_EMPTY;
            }
        }
        return field;
    }
    /**
     * getFieldPointType
     * @param {Point} point
     * @return {number}
     */
    getFieldPointType(point) {
        return this.field[point.y][point.x];
    }
    /**
     * setFieldPointType
     * @param {Point} point
     * @param {number} type
     */
    setFieldPointType(point, type) {
        this.field[point.y][point.x] = type;
    }
    /**
     * getStartPoint
     * @return {Point} startPoint
     */
    getStartPoint() {
        return this.startPoint;
    }
    /**
     * isStartPoint
     * @param {Point} point
     * @return {boolean}
     */
    isStartPoint(point) {
        return point.x === this.startPoint.x && point.y === this.startPoint.y;
    }
    /**
     * getEndPoint
     * @return {Point} endPoint
     */
    getEndPoint() {
        return this.endPoint;
    }
    /**
     * setEndPoint
     * @param {Point} point
     * @return {boolean}
     */
    setEndPoint(point) {
        const type = this.getFieldPointType(point);
        if (type !== Maze.MAZE_WALL) {
            this.endPoint = point;
            return true;
        }
        return false;
    }
    /**
     * isEndPoint
     * @param {Point} point
     * @return {boolean}
     */
    isEndPoint(point) {
        return point.x === this.endPoint.x && point.y === this.endPoint.y;
    }
    /**
     * getCurrentPoint
     * @return {Point} currentPoint
     */
    getCurrentPoint() {
        return this.currentPoint;
    }
    /**
     * setCurrentPoint
     * @param {Point} point
     * @return {boolean}
     */
    setCurrentPoint(point) {
        const type = this.getFieldPointType(point);
        if (type !== Maze.MAZE_WALL) {
            this.currentPoint = point;
            return true;
        }
        return false;
    }
    /**
     * isCurrentPoint
     * @param {Point} point
     * @return {boolean}
     */
    isCurrentPoint(point) {
        return point.x === this.currentPoint.x && point.y === this.currentPoint.y;
    }
    /**
     * getNeighboursPoints
     * @param {Point} point
     * @param {number} distance
     * @param {Function} checkFunction
     * @return {Point[]}
     */
    getNeighboursPoints(point, distance, checkFunction) {
        const neighbourPoints = [];
        const points = [];
        points[0] = new point_1.Point(point.x, point.y - distance);
        points[1] = new point_1.Point(point.x + distance, point.y);
        points[2] = new point_1.Point(point.x, point.y + distance);
        points[3] = new point_1.Point(point.x - distance, point.y);
        for (let i = 0; i < 4; i++) {
            if (points[i].x > 0 && points[i].x < this.width - 1 &&
                points[i].y > 0 && points[i].y < this.height - 1) {
                const type = this.getFieldPointType(points[i]);
                if (checkFunction(type)) {
                    neighbourPoints.push(points[i]);
                }
            }
        }
        return neighbourPoints;
    }
    /**
     * move
     * @param {Function} step
     */
    move(step) {
        while (step()) {
            this.setFieldPointType(this.getCurrentPoint(), Maze.MAZE_WAY);
            const neighbourPoints = this.getNeighboursPoints(this.getCurrentPoint(), 1, (type) => {
                return type === Maze.MAZE_PATH || type === Maze.MAZE_WAY;
            });
            if (neighbourPoints.length > 2) {
                break;
            }
        }
    }
    /**
     * moveLeft
     * @return {void}
     */
    moveLeft() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x - 1, this.currentPoint.y);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveRight
     * @return {void}
     */
    moveRight() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x + 1, this.currentPoint.y);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveUp
     * @return {void}
     */
    moveUp() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x, this.currentPoint.y - 1);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveDown
     * @return {void}
     */
    moveDown() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x, this.currentPoint.y + 1);
            return this.setCurrentPoint(nextPoint);
        });
    }
}
exports.Maze = Maze;
Maze.MAZE_EMPTY = 0;
Maze.MAZE_WALL = 1;
Maze.MAZE_PATH = 2;
Maze.MAZE_WAY = 3;


/***/ }),

/***/ "./src/point.ts":
/*!**********************!*\
  !*** ./src/point.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.Point = void 0;
/**
 * Class Point
 */
class Point {
    /**
     * Constructor
     * @param {int} x
     * @param {int} y
     */
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
exports.Point = Point;


/***/ }),

/***/ "./src/renderers/canvas.ts":
/*!*********************************!*\
  !*** ./src/renderers/canvas.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasRenderer = void 0;
const maze_1 = __webpack_require__(/*! ../maze */ "./src/maze.ts");
const point_1 = __webpack_require__(/*! ../point */ "./src/point.ts");
/**
 * Class CanvasRenderer
 */
class CanvasRenderer {
    /**
     * Constructor
     * @param {Maze} maze
     * @param {HTMLCanvasElement} canvas
     * @param {number} pointSize
     * @param {string} colorBorder
     * @param {string} colorPath
     * @param {string} colorWay
     * @param {string} colorStartPoint
     * @param {string} colorEndPoint
     * @param {string} colorCurrentPoint
     */
    constructor(maze, canvas, pointSize, colorBorder = '#032B43', colorPath = '#3F88C5', colorWay = '#F19953', colorStartPoint = '#136F63', colorEndPoint = '#FFBA08', colorCurrentPoint = '#D00000') {
        this.pointSize = pointSize;
        this.colorBorder = colorBorder;
        this.colorPath = colorPath;
        this.colorWay = colorWay;
        this.colorStartPoint = colorStartPoint;
        this.colorEndPoint = colorEndPoint;
        this.colorCurrentPoint = colorCurrentPoint;
        this.maze = maze;
        this.canvas = canvas;
        canvas.width = this.pointSize * this.maze.getWidth();
        canvas.height = this.pointSize * this.maze.getHeight();
    }
    /**
     * render
     */
    render() {
        const ctx = this.canvas.getContext('2d');
        if (ctx !== null) {
            ctx.fillStyle = this.colorBorder;
            ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            for (let y = 0; y < this.maze.getHeight(); y++) {
                for (let x = 0; x < this.maze.getWidth(); x++) {
                    const point = new point_1.Point(x, y);
                    const type = this.maze.getFieldPointType(point);
                    if (this.maze.isCurrentPoint(point)) {
                        ctx.fillStyle = this.colorCurrentPoint;
                    }
                    else if (this.maze.isStartPoint(point)) {
                        ctx.fillStyle = this.colorStartPoint;
                    }
                    else if (this.maze.isEndPoint(point)) {
                        ctx.fillStyle = this.colorEndPoint;
                    }
                    else if (type === maze_1.Maze.MAZE_PATH) {
                        ctx.fillStyle = this.colorPath;
                    }
                    else if (type === maze_1.Maze.MAZE_WAY) {
                        ctx.fillStyle = this.colorWay;
                    }
                    if (type !== maze_1.Maze.MAZE_WALL) {
                        ctx.fillRect(this.pointSize * x, this.pointSize * y, this.pointSize, this.pointSize);
                    }
                }
            }
        }
    }
}
exports.CanvasRenderer = CanvasRenderer;


/***/ }),

/***/ "./src/web-bundle.ts":
/*!***************************!*\
  !*** ./src/web-bundle.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const backtracking_1 = __webpack_require__(/*! ./generators/backtracking */ "./src/generators/backtracking.ts");
const canvas_1 = __webpack_require__(/*! ./renderers/canvas */ "./src/renderers/canvas.ts");
const canvas = document.getElementById("canvas");
const mazeBacktrackingGenerator = new backtracking_1.BacktrackingGenerator(41, 41);
const mazeCanvasRender = new canvas_1.CanvasRenderer(mazeBacktrackingGenerator, canvas, 20);
window.mazeBacktrackingGenerator = mazeBacktrackingGenerator;
window.mazeCanvasRender = mazeCanvasRender;


/***/ })

/******/ });
//# sourceMappingURL=web-bundle.js.map