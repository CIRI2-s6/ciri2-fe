import {
  CommonModule,
  NgForOf,
  NgIf,
  NgTemplateOutlet
} from "./chunk-ZHMGMVY2.js";
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  InjectionToken,
  Input,
  NgModule,
  Output,
  Renderer2,
  Subject,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainer,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction1,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-EAZNXLAH.js";

// node_modules/.pnpm/angular-notifier@14.0.0_@angular+common@17.3.0_@angular+core@17.3.0/node_modules/angular-notifier/fesm2022/angular-notifier.mjs
var _c0 = (a0) => ({
  notification: a0
});
function NotifierNotificationComponent_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainer(0, 2);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵproperty("ngTemplateOutlet", ctx_r0.notification.template)("ngTemplateOutletContext", ɵɵpureFunction1(2, _c0, ctx_r0.notification));
  }
}
function NotifierNotificationComponent_ng_template_1_button_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "button", 5);
    ɵɵlistener("click", function NotifierNotificationComponent_ng_template_1_button_2_Template_button_click_0_listener() {
      ɵɵrestoreView(_r2);
      const ctx_r0 = ɵɵnextContext(2);
      return ɵɵresetView(ctx_r0.onClickDismiss());
    });
    ɵɵnamespaceSVG();
    ɵɵelementStart(1, "svg", 6);
    ɵɵelement(2, "path", 7);
    ɵɵelementEnd()();
  }
}
function NotifierNotificationComponent_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementStart(0, "p", 3);
    ɵɵtext(1);
    ɵɵelementEnd();
    ɵɵtemplate(2, NotifierNotificationComponent_ng_template_1_button_2_Template, 3, 0, "button", 4);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.notification.message);
    ɵɵadvance();
    ɵɵproperty("ngIf", ctx_r0.config.behaviour.showDismissButton);
  }
}
function NotifierContainerComponent_li_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = ɵɵgetCurrentView();
    ɵɵelementStart(0, "li", 2)(1, "notifier-notification", 3);
    ɵɵlistener("ready", function NotifierContainerComponent_li_1_Template_notifier_notification_ready_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNotificationReady($event));
    })("dismiss", function NotifierContainerComponent_li_1_Template_notifier_notification_dismiss_1_listener($event) {
      ɵɵrestoreView(_r1);
      const ctx_r1 = ɵɵnextContext();
      return ɵɵresetView(ctx_r1.onNotificationDismiss($event));
    });
    ɵɵelementEnd()();
  }
  if (rf & 2) {
    const notification_r3 = ctx.$implicit;
    ɵɵadvance();
    ɵɵproperty("notification", notification_r3);
  }
}
var NotifierNotification = class {
  /**
   * Constructor
   *
   * @param options Notifier options
   */
  constructor(options) {
    this.template = null;
    Object.assign(this, options);
    if (options.id === void 0) {
      this.id = `ID_${(/* @__PURE__ */ new Date()).getTime()}`;
    }
  }
};
var _NotifierQueueService = class _NotifierQueueService {
  /**
   * Constructor
   */
  constructor() {
    this.actionStream = new Subject();
    this.actionQueue = [];
    this.isActionInProgress = false;
  }
  /**
   * Push a new action to the queue, and try to run it
   *
   * @param action Action object
   */
  push(action) {
    this.actionQueue.push(action);
    this.tryToRunNextAction();
  }
  /**
   * Continue with the next action (called when the current action is finished)
   */
  continue() {
    this.isActionInProgress = false;
    this.tryToRunNextAction();
  }
  /**
   * Try to run the next action in the queue; we skip if there already is some action in progress, or if there is no action left
   */
  tryToRunNextAction() {
    if (this.isActionInProgress || this.actionQueue.length === 0) {
      return;
    }
    this.isActionInProgress = true;
    this.actionStream.next(this.actionQueue.shift());
  }
};
_NotifierQueueService.ɵfac = function NotifierQueueService_Factory(t) {
  return new (t || _NotifierQueueService)();
};
_NotifierQueueService.ɵprov = ɵɵdefineInjectable({
  token: _NotifierQueueService,
  factory: _NotifierQueueService.ɵfac
});
var NotifierQueueService = _NotifierQueueService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierQueueService, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var NotifierOptionsToken = new InjectionToken("[angular-notifier] Notifier Options");
var NotifierConfigToken = new InjectionToken("[anuglar-notifier] Notifier Config");
var NotifierConfig = class {
  /**
   * Constructor
   *
   * @param [customOptions={}] Custom notifier options, optional
   */
  constructor(customOptions = {}) {
    this.animations = {
      enabled: true,
      hide: {
        easing: "ease",
        offset: 50,
        preset: "fade",
        speed: 300
      },
      overlap: 150,
      shift: {
        easing: "ease",
        speed: 300
      },
      show: {
        easing: "ease",
        preset: "slide",
        speed: 300
      }
    };
    this.behaviour = {
      autoHide: 7e3,
      onClick: false,
      onMouseover: "pauseAutoHide",
      showDismissButton: true,
      stacking: 4
    };
    this.position = {
      horizontal: {
        distance: 12,
        position: "left"
      },
      vertical: {
        distance: 12,
        gap: 10,
        position: "bottom"
      }
    };
    this.theme = "material";
    if (customOptions.theme !== void 0) {
      this.theme = customOptions.theme;
    }
    if (customOptions.animations !== void 0) {
      if (customOptions.animations.enabled !== void 0) {
        this.animations.enabled = customOptions.animations.enabled;
      }
      if (customOptions.animations.overlap !== void 0) {
        this.animations.overlap = customOptions.animations.overlap;
      }
      if (customOptions.animations.hide !== void 0) {
        Object.assign(this.animations.hide, customOptions.animations.hide);
      }
      if (customOptions.animations.shift !== void 0) {
        Object.assign(this.animations.shift, customOptions.animations.shift);
      }
      if (customOptions.animations.show !== void 0) {
        Object.assign(this.animations.show, customOptions.animations.show);
      }
    }
    if (customOptions.behaviour !== void 0) {
      Object.assign(this.behaviour, customOptions.behaviour);
    }
    if (customOptions.position !== void 0) {
      if (customOptions.position.horizontal !== void 0) {
        Object.assign(this.position.horizontal, customOptions.position.horizontal);
      }
      if (customOptions.position.vertical !== void 0) {
        Object.assign(this.position.vertical, customOptions.position.vertical);
      }
    }
  }
};
var _NotifierService = class _NotifierService {
  /**
   * Constructor
   *
   * @param notifierQueueService Notifier queue service
   * @param config               Notifier configuration, optionally injected as a dependency
   */
  constructor(notifierQueueService, config) {
    this.queueService = notifierQueueService;
    this.config = config;
  }
  /**
   * Get the notifier configuration
   *
   * @returns Notifier configuration
   */
  getConfig() {
    return this.config;
  }
  /**
   * Get the observable for handling actions
   *
   * @returns Observable of NotifierAction
   */
  get actionStream() {
    return this.queueService.actionStream.asObservable();
  }
  /**
   * API: Show a new notification
   *
   * @param notificationOptions Notification options
   */
  show(notificationOptions) {
    this.queueService.push({
      payload: notificationOptions,
      type: "SHOW"
    });
  }
  /**
   * API: Hide a specific notification, given its ID
   *
   * @param notificationId ID of the notification to hide
   */
  hide(notificationId) {
    this.queueService.push({
      payload: notificationId,
      type: "HIDE"
    });
  }
  /**
   * API: Hide the newest notification
   */
  hideNewest() {
    this.queueService.push({
      type: "HIDE_NEWEST"
    });
  }
  /**
   * API: Hide the oldest notification
   */
  hideOldest() {
    this.queueService.push({
      type: "HIDE_OLDEST"
    });
  }
  /**
   * API: Hide all notifications at once
   */
  hideAll() {
    this.queueService.push({
      type: "HIDE_ALL"
    });
  }
  /**
   * API: Shortcut for showing a new notification
   *
   * @param type             Type of the notification
   * @param message          Message of the notification
   * @param [notificationId] Unique ID for the notification (optional)
   */
  notify(type, message, notificationId) {
    const notificationOptions = {
      message,
      type
    };
    if (notificationId !== void 0) {
      notificationOptions.id = notificationId;
    }
    this.show(notificationOptions);
  }
};
_NotifierService.ɵfac = function NotifierService_Factory(t) {
  return new (t || _NotifierService)(ɵɵinject(NotifierQueueService), ɵɵinject(NotifierConfigToken));
};
_NotifierService.ɵprov = ɵɵdefineInjectable({
  token: _NotifierService,
  factory: _NotifierService.ɵfac
});
var NotifierService = _NotifierService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierService, [{
    type: Injectable
  }], function() {
    return [{
      type: NotifierQueueService
    }, {
      type: NotifierConfig,
      decorators: [{
        type: Inject,
        args: [NotifierConfigToken]
      }]
    }];
  }, null);
})();
var _NotifierTimerService = class _NotifierTimerService {
  /**
   * Constructor
   */
  constructor() {
    this.now = 0;
    this.remaining = 0;
  }
  /**
   * Start (or resume) the timer
   *
   * @param   duration Timer duration, in ms
   * @returns          Promise, resolved once the timer finishes
   */
  start(duration) {
    return new Promise((resolve) => {
      this.remaining = duration;
      this.finishPromiseResolver = resolve;
      this.continue();
    });
  }
  /**
   * Pause the timer
   */
  pause() {
    clearTimeout(this.timerId);
    this.remaining -= (/* @__PURE__ */ new Date()).getTime() - this.now;
  }
  /**
   * Continue the timer
   */
  continue() {
    this.now = (/* @__PURE__ */ new Date()).getTime();
    this.timerId = window.setTimeout(() => {
      this.finish();
    }, this.remaining);
  }
  /**
   * Stop the timer
   */
  stop() {
    clearTimeout(this.timerId);
    this.remaining = 0;
  }
  /**
   * Finish up the timeout by resolving the timer promise
   */
  finish() {
    this.finishPromiseResolver();
  }
};
_NotifierTimerService.ɵfac = function NotifierTimerService_Factory(t) {
  return new (t || _NotifierTimerService)();
};
_NotifierTimerService.ɵprov = ɵɵdefineInjectable({
  token: _NotifierTimerService,
  factory: _NotifierTimerService.ɵfac
});
var NotifierTimerService = _NotifierTimerService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierTimerService, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var fade = {
  hide: () => {
    return {
      from: {
        opacity: "1"
      },
      to: {
        opacity: "0"
      }
    };
  },
  show: () => {
    return {
      from: {
        opacity: "0"
      },
      to: {
        opacity: "1"
      }
    };
  }
};
var slide = {
  hide: (notification) => {
    const config = notification.component.getConfig();
    const shift = notification.component.getShift();
    let from;
    let to;
    if (config.position.horizontal.position === "left") {
      from = {
        transform: `translate3d( 0, ${shift}px, 0 )`
      };
      to = {
        transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), ${shift}px, 0 )`
      };
    } else if (config.position.horizontal.position === "right") {
      from = {
        transform: `translate3d( 0, ${shift}px, 0 )`
      };
      to = {
        transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), ${shift}px, 0 )`
      };
    } else {
      let horizontalPosition;
      if (config.position.vertical.position === "top") {
        horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
      } else {
        horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
      }
      from = {
        transform: `translate3d( -50%, ${shift}px, 0 )`
      };
      to = {
        transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
      };
    }
    return {
      from,
      to
    };
  },
  show: (notification) => {
    const config = notification.component.getConfig();
    let from;
    let to;
    if (config.position.horizontal.position === "left") {
      from = {
        transform: `translate3d( calc( -100% - ${config.position.horizontal.distance}px - 10px ), 0, 0 )`
      };
      to = {
        transform: "translate3d( 0, 0, 0 )"
      };
    } else if (config.position.horizontal.position === "right") {
      from = {
        transform: `translate3d( calc( 100% + ${config.position.horizontal.distance}px + 10px ), 0, 0 )`
      };
      to = {
        transform: "translate3d( 0, 0, 0 )"
      };
    } else {
      let horizontalPosition;
      if (config.position.vertical.position === "top") {
        horizontalPosition = `calc( -100% - ${config.position.horizontal.distance}px - 10px )`;
      } else {
        horizontalPosition = `calc( 100% + ${config.position.horizontal.distance}px + 10px )`;
      }
      from = {
        transform: `translate3d( -50%, ${horizontalPosition}, 0 )`
      };
      to = {
        transform: "translate3d( -50%, 0, 0 )"
      };
    }
    return {
      from,
      to
    };
  }
};
var _NotifierAnimationService = class _NotifierAnimationService {
  /**
   * Constructor
   */
  constructor() {
    this.animationPresets = {
      fade,
      slide
    };
  }
  /**
   * Get animation data
   *
   * This method generates all data the Web Animations API needs to animate our notification. The result depends on both the animation
   * direction (either in or out) as well as the notifications (and its attributes) itself.
   *
   * @param   direction    Animation direction, either in or out
   * @param   notification Notification the animation data should be generated for
   * @returns Animation information
   */
  getAnimationData(direction, notification) {
    let keyframes;
    let duration;
    let easing;
    if (direction === "show") {
      keyframes = this.animationPresets[notification.component.getConfig().animations.show.preset].show(notification);
      duration = notification.component.getConfig().animations.show.speed;
      easing = notification.component.getConfig().animations.show.easing;
    } else {
      keyframes = this.animationPresets[notification.component.getConfig().animations.hide.preset].hide(notification);
      duration = notification.component.getConfig().animations.hide.speed;
      easing = notification.component.getConfig().animations.hide.easing;
    }
    return {
      keyframes: [keyframes.from, keyframes.to],
      options: {
        duration,
        easing,
        fill: "forwards"
        // Keep the newly painted state after the animation finished
      }
    };
  }
};
_NotifierAnimationService.ɵfac = function NotifierAnimationService_Factory(t) {
  return new (t || _NotifierAnimationService)();
};
_NotifierAnimationService.ɵprov = ɵɵdefineInjectable({
  token: _NotifierAnimationService,
  factory: _NotifierAnimationService.ɵfac
});
var NotifierAnimationService = _NotifierAnimationService;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierAnimationService, [{
    type: Injectable
  }], function() {
    return [];
  }, null);
})();
var _NotifierNotificationComponent = class _NotifierNotificationComponent {
  /**
   * Constructor
   *
   * @param elementRef               Reference to the component's element
   * @param renderer                 Angular renderer
   * @param notifierService          Notifier service
   * @param notifierTimerService     Notifier timer service
   * @param notifierAnimationService Notifier animation service
   */
  constructor(elementRef, renderer, notifierService, notifierTimerService, notifierAnimationService) {
    this.config = notifierService.getConfig();
    this.ready = new EventEmitter();
    this.dismiss = new EventEmitter();
    this.timerService = notifierTimerService;
    this.animationService = notifierAnimationService;
    this.renderer = renderer;
    this.element = elementRef.nativeElement;
    this.elementShift = 0;
  }
  /**
   * Component after view init lifecycle hook, setts up the component and then emits the ready event
   */
  ngAfterViewInit() {
    this.setup();
    this.elementHeight = this.element.offsetHeight;
    this.elementWidth = this.element.offsetWidth;
    this.ready.emit(this);
  }
  /**
   * Get the notifier config
   *
   * @returns Notifier configuration
   */
  getConfig() {
    return this.config;
  }
  /**
   * Get notification element height (in px)
   *
   * @returns Notification element height (in px)
   */
  getHeight() {
    return this.elementHeight;
  }
  /**
   * Get notification element width (in px)
   *
   * @returns Notification element height (in px)
   */
  getWidth() {
    return this.elementWidth;
  }
  /**
   * Get notification shift offset (in px)
   *
   * @returns Notification element shift offset (in px)
   */
  getShift() {
    return this.elementShift;
  }
  /**
   * Show (animate in) this notification
   *
   * @returns Promise, resolved when done
   */
  show() {
    return new Promise((resolve) => {
      if (this.config.animations.enabled && this.config.animations.show.speed > 0) {
        const animationData = this.animationService.getAnimationData("show", this.notification);
        const animatedProperties = Object.keys(animationData.keyframes[0]);
        for (let i = animatedProperties.length - 1; i >= 0; i--) {
          this.renderer.setStyle(this.element, animatedProperties[i], animationData.keyframes[0][animatedProperties[i]]);
        }
        this.renderer.setStyle(this.element, "visibility", "visible");
        const animation = this.element.animate(animationData.keyframes, animationData.options);
        animation.onfinish = () => {
          this.startAutoHideTimer();
          resolve();
        };
      } else {
        this.renderer.setStyle(this.element, "visibility", "visible");
        this.startAutoHideTimer();
        resolve();
      }
    });
  }
  /**
   * Hide (animate out) this notification
   *
   * @returns Promise, resolved when done
   */
  hide() {
    return new Promise((resolve) => {
      this.stopAutoHideTimer();
      if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
        const animationData = this.animationService.getAnimationData("hide", this.notification);
        const animation = this.element.animate(animationData.keyframes, animationData.options);
        animation.onfinish = () => {
          resolve();
        };
      } else {
        resolve();
      }
    });
  }
  /**
   * Shift (move) this notification
   *
   * @param   distance         Distance to shift (in px)
   * @param   shiftToMakePlace Flag, defining in which direction to shift
   * @returns Promise, resolved when done
   */
  shift(distance, shiftToMakePlace) {
    return new Promise((resolve) => {
      let newElementShift;
      if (this.config.position.vertical.position === "top" && shiftToMakePlace || this.config.position.vertical.position === "bottom" && !shiftToMakePlace) {
        newElementShift = this.elementShift + distance + this.config.position.vertical.gap;
      } else {
        newElementShift = this.elementShift - distance - this.config.position.vertical.gap;
      }
      const horizontalPosition = this.config.position.horizontal.position === "middle" ? "-50%" : "0";
      if (this.config.animations.enabled && this.config.animations.shift.speed > 0) {
        const animationData = {
          // TODO: Extract into animation service
          keyframes: [{
            transform: `translate3d( ${horizontalPosition}, ${this.elementShift}px, 0 )`
          }, {
            transform: `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`
          }],
          options: {
            duration: this.config.animations.shift.speed,
            easing: this.config.animations.shift.easing,
            fill: "forwards"
          }
        };
        this.elementShift = newElementShift;
        const animation = this.element.animate(animationData.keyframes, animationData.options);
        animation.onfinish = () => {
          resolve();
        };
      } else {
        this.renderer.setStyle(this.element, "transform", `translate3d( ${horizontalPosition}, ${newElementShift}px, 0 )`);
        this.elementShift = newElementShift;
        resolve();
      }
    });
  }
  /**
   * Handle click on dismiss button
   */
  onClickDismiss() {
    this.dismiss.emit(this.notification.id);
  }
  /**
   * Handle mouseover over notification area
   */
  onNotificationMouseover() {
    if (this.config.behaviour.onMouseover === "pauseAutoHide") {
      this.pauseAutoHideTimer();
    } else if (this.config.behaviour.onMouseover === "resetAutoHide") {
      this.stopAutoHideTimer();
    }
  }
  /**
   * Handle mouseout from notification area
   */
  onNotificationMouseout() {
    if (this.config.behaviour.onMouseover === "pauseAutoHide") {
      this.continueAutoHideTimer();
    } else if (this.config.behaviour.onMouseover === "resetAutoHide") {
      this.startAutoHideTimer();
    }
  }
  /**
   * Handle click on notification area
   */
  onNotificationClick() {
    if (this.config.behaviour.onClick === "hide") {
      this.onClickDismiss();
    }
  }
  /**
   * Start the auto hide timer (if enabled)
   */
  startAutoHideTimer() {
    if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.start(this.config.behaviour.autoHide).then(() => {
        this.onClickDismiss();
      });
    }
  }
  /**
   * Pause the auto hide timer (if enabled)
   */
  pauseAutoHideTimer() {
    if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.pause();
    }
  }
  /**
   * Continue the auto hide timer (if enabled)
   */
  continueAutoHideTimer() {
    if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.continue();
    }
  }
  /**
   * Stop the auto hide timer (if enabled)
   */
  stopAutoHideTimer() {
    if (this.config.behaviour.autoHide !== false && this.config.behaviour.autoHide > 0) {
      this.timerService.stop();
    }
  }
  /**
   * Initial notification setup
   */
  setup() {
    if (this.config.position.horizontal.position === "left") {
      this.renderer.setStyle(this.element, "left", `${this.config.position.horizontal.distance}px`);
    } else if (this.config.position.horizontal.position === "right") {
      this.renderer.setStyle(this.element, "right", `${this.config.position.horizontal.distance}px`);
    } else {
      this.renderer.setStyle(this.element, "left", "50%");
      this.renderer.setStyle(this.element, "transform", "translate3d( -50%, 0, 0 )");
    }
    if (this.config.position.vertical.position === "top") {
      this.renderer.setStyle(this.element, "top", `${this.config.position.vertical.distance}px`);
    } else {
      this.renderer.setStyle(this.element, "bottom", `${this.config.position.vertical.distance}px`);
    }
    this.renderer.addClass(this.element, `notifier__notification--${this.notification.type}`);
    this.renderer.addClass(this.element, `notifier__notification--${this.config.theme}`);
  }
};
_NotifierNotificationComponent.ɵfac = function NotifierNotificationComponent_Factory(t) {
  return new (t || _NotifierNotificationComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NotifierService), ɵɵdirectiveInject(NotifierTimerService), ɵɵdirectiveInject(NotifierAnimationService));
};
_NotifierNotificationComponent.ɵcmp = ɵɵdefineComponent({
  type: _NotifierNotificationComponent,
  selectors: [["notifier-notification"]],
  hostAttrs: [1, "notifier__notification"],
  hostBindings: function NotifierNotificationComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NotifierNotificationComponent_click_HostBindingHandler() {
        return ctx.onNotificationClick();
      })("mouseout", function NotifierNotificationComponent_mouseout_HostBindingHandler() {
        return ctx.onNotificationMouseout();
      })("mouseover", function NotifierNotificationComponent_mouseover_HostBindingHandler() {
        return ctx.onNotificationMouseover();
      });
    }
  },
  inputs: {
    notification: "notification"
  },
  outputs: {
    ready: "ready",
    dismiss: "dismiss"
  },
  features: [ɵɵProvidersFeature([
    // We provide the timer to the component's local injector, so that every notification components gets its own
    // instance of the timer service, thus running their timers independently from each other
    NotifierTimerService
  ])],
  decls: 3,
  vars: 2,
  consts: [["predefinedNotification", ""], [3, "ngTemplateOutlet", "ngTemplateOutletContext", 4, "ngIf", "ngIfElse"], [3, "ngTemplateOutlet", "ngTemplateOutletContext"], [1, "notifier__notification-message"], ["class", "notifier__notification-button", "type", "button", "title", "dismiss", 3, "click", 4, "ngIf"], ["type", "button", "title", "dismiss", 1, "notifier__notification-button", 3, "click"], ["viewBox", "0 0 24 24", "width", "20", "height", "20", 1, "notifier__notification-button-icon"], ["d", "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"]],
  template: function NotifierNotificationComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtemplate(0, NotifierNotificationComponent_ng_container_0_Template, 1, 4, "ng-container", 1)(1, NotifierNotificationComponent_ng_template_1_Template, 3, 2, "ng-template", null, 0, ɵɵtemplateRefExtractor);
    }
    if (rf & 2) {
      const predefinedNotification_r3 = ɵɵreference(2);
      ɵɵproperty("ngIf", ctx.notification.template)("ngIfElse", predefinedNotification_r3);
    }
  },
  dependencies: [NgIf, NgTemplateOutlet],
  encapsulation: 2,
  changeDetection: 0
});
var NotifierNotificationComponent = _NotifierNotificationComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierNotificationComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        "(click)": "onNotificationClick()",
        "(mouseout)": "onNotificationMouseout()",
        "(mouseover)": "onNotificationMouseover()",
        class: "notifier__notification"
      },
      providers: [
        // We provide the timer to the component's local injector, so that every notification components gets its own
        // instance of the timer service, thus running their timers independently from each other
        NotifierTimerService
      ],
      selector: "notifier-notification",
      template: '<ng-container\n  *ngIf="notification.template; else predefinedNotification"\n  [ngTemplateOutlet]="notification.template"\n  [ngTemplateOutletContext]="{ notification: notification }"\n>\n</ng-container>\n\n<ng-template #predefinedNotification>\n  <p class="notifier__notification-message">{{ notification.message }}</p>\n  <button\n    class="notifier__notification-button"\n    type="button"\n    title="dismiss"\n    *ngIf="config.behaviour.showDismissButton"\n    (click)="onClickDismiss()"\n  >\n    <svg class="notifier__notification-button-icon" viewBox="0 0 24 24" width="20" height="20">\n      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />\n    </svg>\n  </button>\n</ng-template>\n'
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: NotifierService
    }, {
      type: NotifierTimerService
    }, {
      type: NotifierAnimationService
    }];
  }, {
    notification: [{
      type: Input
    }],
    ready: [{
      type: Output
    }],
    dismiss: [{
      type: Output
    }]
  });
})();
var _NotifierContainerComponent = class _NotifierContainerComponent {
  /**
   * Constructor
   *
   * @param changeDetector       Change detector, used for manually triggering change detection runs
   * @param notifierQueueService Notifier queue service
   * @param notifierService      Notifier service
   */
  constructor(changeDetector, notifierQueueService, notifierService) {
    this.changeDetector = changeDetector;
    this.queueService = notifierQueueService;
    this.config = notifierService.getConfig();
    this.notifications = [];
    this.queueServiceSubscription = this.queueService.actionStream.subscribe((action) => {
      this.handleAction(action).then(() => {
        this.queueService.continue();
      });
    });
  }
  /**
   * Component destroyment lifecycle hook, cleans up the observable subsciption
   */
  ngOnDestroy() {
    if (this.queueServiceSubscription) {
      this.queueServiceSubscription.unsubscribe();
    }
  }
  /**
   * Notification identifier, used as the ngFor trackby function
   *
   * @param   index        Index
   * @param   notification Notifier notification
   * @returns Notification ID as the unique identnfier
   */
  identifyNotification(index, notification) {
    return notification.id;
  }
  /**
   * Event handler, handles clicks on notification dismiss buttons
   *
   * @param notificationId ID of the notification to dismiss
   */
  onNotificationDismiss(notificationId) {
    this.queueService.push({
      payload: notificationId,
      type: "HIDE"
    });
  }
  /**
   * Event handler, handles notification ready events
   *
   * @param notificationComponent Notification component reference
   */
  onNotificationReady(notificationComponent) {
    const currentNotification = this.notifications[this.notifications.length - 1];
    currentNotification.component = notificationComponent;
    this.continueHandleShowAction(currentNotification);
  }
  /**
   * Handle incoming actions by mapping action types to methods, and then running them
   *
   * @param   action Action object
   * @returns Promise, resolved when done
   */
  handleAction(action) {
    switch (action.type) {
      case "SHOW":
        return this.handleShowAction(action);
      case "HIDE":
        return this.handleHideAction(action);
      case "HIDE_OLDEST":
        return this.handleHideOldestAction(action);
      case "HIDE_NEWEST":
        return this.handleHideNewestAction(action);
      case "HIDE_ALL":
        return this.handleHideAllAction();
      default:
        return new Promise((resolve) => {
          resolve();
        });
    }
  }
  /**
   * Show a new notification
   *
   * We simply add the notification to the list, and then wait until its properly initialized / created / rendered.
   *
   * @param   action Action object
   * @returns Promise, resolved when done
   */
  handleShowAction(action) {
    return new Promise((resolve) => {
      this.tempPromiseResolver = resolve;
      this.addNotificationToList(new NotifierNotification(action.payload));
    });
  }
  /**
   * Continue to show a new notification (after the notification components is initialized / created / rendered).
   *
   * If this is the first (and thus only) notification, we can simply show it. Otherwhise, if stacking is disabled (or a low value), we
   * switch out notifications, in particular we hide the existing one, and then show our new one. Yet, if stacking is enabled, we first
   * shift all older notifications, and then show our new notification. In addition, if there are too many notification on the screen,
   * we hide the oldest one first. Furthermore, if configured, animation overlapping is applied.
   *
   * @param notification New notification to show
   */
  continueHandleShowAction(notification) {
    const numberOfNotifications = this.notifications.length;
    if (numberOfNotifications === 1) {
      notification.component.show().then(this.tempPromiseResolver);
    } else {
      const implicitStackingLimit = 2;
      if (this.config.behaviour.stacking === false || this.config.behaviour.stacking < implicitStackingLimit) {
        this.notifications[0].component.hide().then(() => {
          this.removeNotificationFromList(this.notifications[0]);
          notification.component.show().then(this.tempPromiseResolver);
        });
      } else {
        const stepPromises = [];
        if (numberOfNotifications > this.config.behaviour.stacking) {
          const oldNotifications = this.notifications.slice(1, numberOfNotifications - 1);
          if (this.config.animations.enabled) {
            if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
              stepPromises.push(this.notifications[0].component.hide());
              setTimeout(() => {
                stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
              }, this.config.animations.hide.speed - this.config.animations.overlap);
              setTimeout(() => {
                stepPromises.push(notification.component.show());
              }, this.config.animations.hide.speed + this.config.animations.shift.speed - this.config.animations.overlap);
            } else {
              stepPromises.push(new Promise((resolve) => {
                this.notifications[0].component.hide().then(() => {
                  this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then(() => {
                    notification.component.show().then(resolve);
                  });
                });
              }));
            }
          } else {
            stepPromises.push(this.notifications[0].component.hide());
            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
            stepPromises.push(notification.component.show());
          }
        } else {
          const oldNotifications = this.notifications.slice(0, numberOfNotifications - 1);
          if (this.config.animations.enabled) {
            if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
              stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
              setTimeout(() => {
                stepPromises.push(notification.component.show());
              }, this.config.animations.shift.speed - this.config.animations.overlap);
            } else {
              stepPromises.push(new Promise((resolve) => {
                this.shiftNotifications(oldNotifications, notification.component.getHeight(), true).then(() => {
                  notification.component.show().then(resolve);
                });
              }));
            }
          } else {
            stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), true));
            stepPromises.push(notification.component.show());
          }
        }
        Promise.all(stepPromises).then(() => {
          if (numberOfNotifications > this.config.behaviour.stacking) {
            this.removeNotificationFromList(this.notifications[0]);
          }
          this.tempPromiseResolver();
        });
      }
    }
  }
  /**
   * Hide an existing notification
   *
   * Fist, we skip everything if there are no notifications at all, or the given notification does not exist. Then, we hide the given
   * notification. If there exist older notifications, we then shift them around to fill the gap. Once both hiding the given notification
   * and shifting the older notificaitons is done, the given notification gets finally removed (from the DOM).
   *
   * @param   action Action object, payload contains the notification ID
   * @returns Promise, resolved when done
   */
  handleHideAction(action) {
    return new Promise((resolve) => {
      const stepPromises = [];
      const notification = this.findNotificationById(action.payload);
      if (notification === void 0) {
        resolve();
        return;
      }
      const notificationIndex = this.findNotificationIndexById(action.payload);
      if (notificationIndex === void 0) {
        resolve();
        return;
      }
      const oldNotifications = this.notifications.slice(0, notificationIndex);
      if (oldNotifications.length > 0) {
        if (this.config.animations.enabled && this.config.animations.hide.speed > 0) {
          if (this.config.animations.overlap !== false && this.config.animations.overlap > 0) {
            stepPromises.push(notification.component.hide());
            setTimeout(() => {
              stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
            }, this.config.animations.hide.speed - this.config.animations.overlap);
          } else {
            notification.component.hide().then(() => {
              stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
            });
          }
        } else {
          stepPromises.push(notification.component.hide());
          stepPromises.push(this.shiftNotifications(oldNotifications, notification.component.getHeight(), false));
        }
      } else {
        stepPromises.push(notification.component.hide());
      }
      Promise.all(stepPromises).then(() => {
        this.removeNotificationFromList(notification);
        resolve();
      });
    });
  }
  /**
   * Hide the oldest notification (bridge to handleHideAction)
   *
   * @param   action Action object
   * @returns Promise, resolved when done
   */
  handleHideOldestAction(action) {
    if (this.notifications.length === 0) {
      return new Promise((resolve) => {
        resolve();
      });
    } else {
      action.payload = this.notifications[0].id;
      return this.handleHideAction(action);
    }
  }
  /**
   * Hide the newest notification (bridge to handleHideAction)
   *
   * @param   action Action object
   * @returns Promise, resolved when done
   */
  handleHideNewestAction(action) {
    if (this.notifications.length === 0) {
      return new Promise((resolve) => {
        resolve();
      });
    } else {
      action.payload = this.notifications[this.notifications.length - 1].id;
      return this.handleHideAction(action);
    }
  }
  /**
   * Hide all notifications at once
   *
   * @returns Promise, resolved when done
   */
  handleHideAllAction() {
    return new Promise((resolve) => {
      const numberOfNotifications = this.notifications.length;
      if (numberOfNotifications === 0) {
        resolve();
        return;
      }
      if (this.config.animations.enabled && this.config.animations.hide.speed > 0 && this.config.animations.hide.offset !== false && this.config.animations.hide.offset > 0) {
        for (let i = numberOfNotifications - 1; i >= 0; i--) {
          const animationOffset = this.config.position.vertical.position === "top" ? numberOfNotifications - 1 : i;
          setTimeout(() => {
            this.notifications[i].component.hide().then(() => {
              if (this.config.position.vertical.position === "top" && i === 0 || this.config.position.vertical.position === "bottom" && i === numberOfNotifications - 1) {
                this.removeAllNotificationsFromList();
                resolve();
              }
            });
          }, this.config.animations.hide.offset * animationOffset);
        }
      } else {
        const stepPromises = [];
        for (let i = numberOfNotifications - 1; i >= 0; i--) {
          stepPromises.push(this.notifications[i].component.hide());
        }
        Promise.all(stepPromises).then(() => {
          this.removeAllNotificationsFromList();
          resolve();
        });
      }
    });
  }
  /**
   * Shift multiple notifications at once
   *
   * @param   notifications List containing the notifications to be shifted
   * @param   distance      Distance to shift (in px)
   * @param   toMakePlace   Flag, defining in which direciton to shift
   * @returns Promise, resolved when done
   */
  shiftNotifications(notifications, distance, toMakePlace) {
    return new Promise((resolve) => {
      if (notifications.length === 0) {
        resolve();
        return;
      }
      const notificationPromises = [];
      for (let i = notifications.length - 1; i >= 0; i--) {
        notificationPromises.push(notifications[i].component.shift(distance, toMakePlace));
      }
      Promise.all(notificationPromises).then(resolve);
    });
  }
  /**
   * Add a new notification to the list of notifications (triggers change detection)
   *
   * @param notification Notification to add to the list of notifications
   */
  addNotificationToList(notification) {
    this.notifications.push(notification);
    this.changeDetector.markForCheck();
  }
  /**
   * Remove an existing notification from the list of notifications (triggers change detection)
   *
   * @param notification Notification to be removed from the list of notifications
   */
  removeNotificationFromList(notification) {
    this.notifications = this.notifications.filter((item) => item.component !== notification.component);
    this.changeDetector.markForCheck();
  }
  /**
   * Remove all notifications from the list (triggers change detection)
   */
  removeAllNotificationsFromList() {
    this.notifications = [];
    this.changeDetector.markForCheck();
  }
  /**
   * Helper: Find a notification in the notification list by a given notification ID
   *
   * @param   notificationId Notification ID, used for finding notification
   * @returns Notification, undefined if not found
   */
  findNotificationById(notificationId) {
    return this.notifications.find((currentNotification) => currentNotification.id === notificationId);
  }
  /**
   * Helper: Find a notification's index by a given notification ID
   *
   * @param   notificationId Notification ID, used for finding a notification's index
   * @returns Notification index, undefined if not found
   */
  findNotificationIndexById(notificationId) {
    const notificationIndex = this.notifications.findIndex((currentNotification) => currentNotification.id === notificationId);
    return notificationIndex !== -1 ? notificationIndex : void 0;
  }
};
_NotifierContainerComponent.ɵfac = function NotifierContainerComponent_Factory(t) {
  return new (t || _NotifierContainerComponent)(ɵɵdirectiveInject(ChangeDetectorRef), ɵɵdirectiveInject(NotifierQueueService), ɵɵdirectiveInject(NotifierService));
};
_NotifierContainerComponent.ɵcmp = ɵɵdefineComponent({
  type: _NotifierContainerComponent,
  selectors: [["notifier-container"]],
  hostAttrs: [1, "notifier__container"],
  decls: 2,
  vars: 2,
  consts: [[1, "notifier__container-list"], ["class", "notifier__container-list-item", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "notifier__container-list-item"], [3, "ready", "dismiss", "notification"]],
  template: function NotifierContainerComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵelementStart(0, "ul", 0);
      ɵɵtemplate(1, NotifierContainerComponent_li_1_Template, 2, 1, "li", 1);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵadvance();
      ɵɵproperty("ngForOf", ctx.notifications)("ngForTrackBy", ctx.identifyNotification);
    }
  },
  dependencies: [NgForOf, NotifierNotificationComponent],
  encapsulation: 2,
  changeDetection: 0
});
var NotifierContainerComponent = _NotifierContainerComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierContainerComponent, [{
    type: Component,
    args: [{
      changeDetection: ChangeDetectionStrategy.OnPush,
      host: {
        class: "notifier__container"
      },
      selector: "notifier-container",
      template: '<ul class="notifier__container-list">\n  <li class="notifier__container-list-item" *ngFor="let notification of notifications; trackBy: identifyNotification">\n    <notifier-notification [notification]="notification" (ready)="onNotificationReady($event)" (dismiss)="onNotificationDismiss($event)">\n    </notifier-notification>\n  </li>\n</ul>\n'
    }]
  }], function() {
    return [{
      type: ChangeDetectorRef
    }, {
      type: NotifierQueueService
    }, {
      type: NotifierService
    }];
  }, null);
})();
function notifierCustomConfigFactory(options) {
  return new NotifierConfig(options);
}
function notifierDefaultConfigFactory() {
  return new NotifierConfig({});
}
var _NotifierModule = class _NotifierModule {
  /**
   * Setup the notifier module with custom providers, in this case with a custom configuration based on the givne options
   *
   * @param   [options={}] - Custom notifier options
   * @returns - Notifier module with custom providers
   */
  static withConfig(options = {}) {
    return {
      ngModule: _NotifierModule,
      providers: [
        // Provide the options itself upfront (as we need to inject them as dependencies -- see below)
        {
          provide: NotifierOptionsToken,
          useValue: options
        },
        // Provide a custom notifier configuration, based on the given notifier options
        {
          deps: [NotifierOptionsToken],
          provide: NotifierConfigToken,
          useFactory: notifierCustomConfigFactory
        }
      ]
    };
  }
};
_NotifierModule.ɵfac = function NotifierModule_Factory(t) {
  return new (t || _NotifierModule)();
};
_NotifierModule.ɵmod = ɵɵdefineNgModule({
  type: _NotifierModule,
  declarations: [NotifierContainerComponent, NotifierNotificationComponent],
  imports: [CommonModule],
  exports: [NotifierContainerComponent]
});
_NotifierModule.ɵinj = ɵɵdefineInjector({
  providers: [
    NotifierAnimationService,
    NotifierService,
    NotifierQueueService,
    // Provide the default notifier configuration if just the module is imported
    {
      provide: NotifierConfigToken,
      useFactory: notifierDefaultConfigFactory
    }
  ],
  imports: [CommonModule]
});
var NotifierModule = _NotifierModule;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NotifierModule, [{
    type: NgModule,
    args: [{
      declarations: [NotifierContainerComponent, NotifierNotificationComponent],
      exports: [NotifierContainerComponent],
      imports: [CommonModule],
      providers: [
        NotifierAnimationService,
        NotifierService,
        NotifierQueueService,
        // Provide the default notifier configuration if just the module is imported
        {
          provide: NotifierConfigToken,
          useFactory: notifierDefaultConfigFactory
        }
      ]
    }]
  }], null, null);
})();
export {
  NotifierConfig,
  NotifierConfigToken,
  NotifierContainerComponent,
  NotifierModule,
  NotifierNotificationComponent,
  NotifierOptionsToken,
  NotifierService,
  notifierCustomConfigFactory,
  notifierDefaultConfigFactory
};
//# sourceMappingURL=angular-notifier.js.map
