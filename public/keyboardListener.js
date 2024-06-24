export default function createKeyboardListener(document) {
  const state = {
    observers: [],
    playerId: null,
  }

  function subscribe(observerFunction) {
    state.observers.push(observerFunction)
  }

  function registerPlayer(playerId) {
    state.playerId = playerId
  }
  function notifyAll(command) {
    console.log(`Notifying ${state.observers.length} observers`)
    for (const observerFunction of state.observers) {
      observerFunction(command)
    }
  }

  document.addEventListener('keydown', handlekeydonw)
  function handlekeydonw(event) {
    const keyPressed = event.key

    const command = {
      type:"move-player",
      playerId: state.playerId,
      keyPressed,
    }

    notifyAll(command)
  }

  return {
    subscribe,
    registerPlayer
  }
}
