import useEffectOnce from "../useEffectOnce";

export default function useTitle(title) {
  useEffectOnce(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
