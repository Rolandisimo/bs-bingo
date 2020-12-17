declare interface TypedEvent<T extends Element> extends Event {
  target: T;
  currentTarget: T;
}

declare interface TypedMouseEvent<T extends Element> extends MouseEvent {
  target: EventTarget & T;
  currentTarget: EventTarget & T;
}
