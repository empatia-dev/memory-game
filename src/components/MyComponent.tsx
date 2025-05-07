type Props = {
    name: string;
  };
  
function MyComponent({ name }: Props) {
    return <p>Hello, {name}!</p>;
}

export default MyComponent;
  