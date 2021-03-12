export default abstract class Mappable<TMapFrom> {
  public set(callback: (thisObject: this) => void) {
    callback(this);
    
    return this;
  }

  public mapFrom(keyPairs: Partial<TMapFrom>) {
    for (const key in keyPairs) {
      if (Object.prototype.hasOwnProperty.call(keyPairs, key)) {
        const v = keyPairs[key];
        (this as any)[key] = v;
      }
    }

    return this;
  }

  public abstract toJSON(): object;
}