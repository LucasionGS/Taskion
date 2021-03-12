export default abstract class Mappable<TMapFrom> {
    set(callback: (thisObject: this) => void): this;
    mapFrom(keyPairs: Partial<TMapFrom>): this;
    abstract toJSON(): object;
}
