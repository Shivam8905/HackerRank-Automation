module.exports = {
    answers: [
        `#include <iostream>
        using namespace std;
        
        int main() {
            int mtx[6][6];
            for (int ii = 0; ii < 6; ++ii) {
                for (int jj = 0; jj < 6; ++jj) {
                    int temp;
                    cin >> temp;
                    mtx[ii][jj] = temp;
                }
            }
            int max = -64;
            for (int ii = 0; ii < 4; ++ii) {
                for (int jj = 0; jj < 4; ++jj) {
                    int sum = mtx[ii][jj]+mtx[ii][jj+1]+mtx[ii][jj+2]+mtx[ii+1][jj+1]
                            + mtx[ii+2][jj]+mtx[ii+2][jj+1]+mtx[ii+2][jj+2]
                            ;
                    if (sum > max) {
                        max = sum;
                    }
                }
            }
            cout << max << endl;
            return 0;
        }`
    ]
}
