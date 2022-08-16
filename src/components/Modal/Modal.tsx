import { Dialog, Transition } from "@headlessui/react";
import {
  Fragment,
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
} from "react";
import clsx from "clsx";

export type AppDialogProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  initialFocus?: MutableRefObject<HTMLElement | null> | boolean;
  rowClassName?: string;
  noDefaultWidth?: boolean;
  modalTrigger: JSX.Element;
};

const Modal = forwardRef(
  (
    {
      children,
      initialFocus = false,
      className,
      rowClassName,
      modalTrigger,
      ...rest
    }: AppDialogProps,
    ref
  ): JSX.Element => {
    const noFocusRef = useRef(null);
    const initialFocusRef = initialFocus === true ? undefined : initialFocus || noFocusRef;

    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => setIsOpen(false);

    const handleClick = () => {
      setIsOpen(prevState => !prevState);
    };

    useImperativeHandle(ref, () => {
      return {
        handleClick,
      };
    });

    return (
      <>
        {modalTrigger}
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            initialFocus={initialFocusRef}
            as="div"
            className={clsx(
              "mx-auto",
              "fixed text-black theme-none",
              "top-0 bottom-0 left-[max(4vw,16px)] right-[max(4vw,16px)]",
              "overflow-y-auto hide-scrollbar z-[99999]"
            )}
            onClose={handleClose}
          >
            <div
              className="col-span-full h-screen overflow-hidden py-[4%] flex items-center hide-scrollbar "
              ref={noFocusRef}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 "
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 backdrop-blur-[10px]  bg-black/70 " />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-[100%]"
                enterTo="opacity-100 "
                leave="ease-in duration-200"
                leaveFrom="opacity-100 "
                leaveTo="opacity-0  translate-y-[100%]"
              >
                <div
                  className={clsx(
                    "bg-white z-[99999999] mx-auto h-fit max-h-full overflow-y-auto",
                    className
                  )}
                  {...rest}
                >
                  <div className={clsx("flex grow col-span-full h-6 pb-0 pt-2", rowClassName)}>
                    <button
                      aria-label="Close the modal"
                      onClick={handleClose}
                      className={"ml-auto p-[2.81px]"}
                    >
                      <img src="/images/close.svg" alt="close-icon" height={24} width={24} />
                    </button>
                  </div>

                  {children}
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    );
  }
);

export default Modal;
