export {};

declare global {
    namespace ReactNavigation {
        interface RootParamList {
            Home: undefined;
            Calculator: { id: string };
            Payment: { id: string };
            Cost: { id: string };
            Payoff: { id: string };
            NotFound: undefined;
        }   
    } 
}