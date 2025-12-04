/**
 * Spire UI - Modular Entry Point
 * 
 * This is the main entry point for the modular version of Spire UI.
 * It re-exports all components and utilities in a tree-shakeable way.
 */

// Types
export * from './types';

// Core
export { instances, emit, globalErrorHandler, setGlobalErrorHandler } from './core';

// Components
export * from './components';

// Re-export individual components for direct imports
export { Accordion } from './components/Accordion';
export { Button } from './components/Button';
export { Carousel } from './components/Carousel';
export { Clipboard } from './components/Clipboard';
export { Collapse } from './components/Collapse';
export { Drawer } from './components/Drawer';
export { Dropdown } from './components/Dropdown';
export { FormValidator } from './components/FormValidator';
export { InfiniteScroll } from './components/InfiniteScroll';
export { Input } from './components/Input';
export { LazyLoad } from './components/LazyLoad';
export { Modal } from './components/Modal';
export { MultiSelect } from './components/MultiSelect';
export { Popover } from './components/Popover';
export { Progress } from './components/Progress';
export { Rating } from './components/Rating';
export { Select } from './components/Select';
export { Skeleton } from './components/Skeleton';
export { Stepper } from './components/Stepper';
export { Table } from './components/Table';
export { Tabs } from './components/Tabs';
export { Tooltip } from './components/Tooltip';
