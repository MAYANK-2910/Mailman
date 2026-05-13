/**
 * Manages drag-and-drop interactions for stack reordering.
 */
export class DragManager {
  public static handleDragStart(stackId: string) {
    console.log(`[DragManager] Drag started for stack: ${stackId}`);
  }

  public static handleDrop(targetId: string) {
    console.log(`[DragManager] Dropped on target: ${targetId}`);
  }
}
