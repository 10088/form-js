import EditorActions from 'diagram-js/lib/features/editor-actions/EditorActions';


export default class FormEditorActions extends EditorActions {
  constructor(eventBus, injector) {
    super(eventBus, injector);

    eventBus.on('form.init', () => {
      this._registerDefaultActions(injector);

      eventBus.fire('editorActions.init', {
        editorActions: this
      });
    });
  }

  _registerDefaultActions(injector) {
    const commandStack = injector.get('commandStack', false),
          formFieldRegistry = injector.get('formFieldRegistry', false),
          modeling = injector.get('modeling', false);

    if (commandStack) {

      // @ts-ignore
      this.register('undo', function() {
        commandStack.undo();
      });

      // @ts-ignore
      this.register('redo', function() {
        commandStack.redo();
      });
    }

    if (modeling) {

      // @ts-ignore
      this.register('setExecutionPlatform', ({ executionPlatform, executionPlatformVersion }) => {
        const root = Array.from(formFieldRegistry.values()).find(({ _parent }) => !_parent);

        modeling.editFormField(root, {
          executionPlatform,
          executionPlatformVersion
        });
      });
    }

    // @ts-ignore
    this.register('getExecutionPlatform', () => {
      const root = Array.from(formFieldRegistry.values()).find(({ _parent }) => !_parent);

      if (root) {
        const {
          executionPlatform,
          executionPlatformVersion
        } = root;

        return {
          executionPlatform,
          executionPlatformVersion
        };
      }
    });
  }
}

FormEditorActions.$inject = [
  'eventBus',
  'injector'
];