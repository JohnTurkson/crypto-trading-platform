import styled from "styled-components"

const SignUpContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

export default function Test() {

    // const TestText = styled.p`
    //   position: fixed;
    //   top: 50%;
    //   left: 50%;
    //   transform: translate(-50%, -50%);
    // `

    // return <TestText>Test</TestText>

    return <SignUpContainer className="test">
        <p>Test</p>
    </SignUpContainer>
}
