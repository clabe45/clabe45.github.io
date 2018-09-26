/**
 * @file Technically these aren't truely constants, as they are initialized after the game started
 */
let game, renderer;

export function setGame(g) { game = g; }
export function setRenderer(r) { renderer = r; }

export function getGame() { return game; }
export function getRenderer() { return renderer; }
