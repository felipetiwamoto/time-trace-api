export const snText = {
    unique() {
        return Array(3).fill(0)
            .map((_) =>
                Math.random().toString(32).substring(2))
            .join("").substring(0, 30)
    }
}