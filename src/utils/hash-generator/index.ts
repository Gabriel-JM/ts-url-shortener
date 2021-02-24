const getRandomText = () => Math.random().toString(32).substring(2, 6)

export class HashGenerator {
  generate() {
    const hash = getRandomText() + getRandomText()

    return hash
  }
}
